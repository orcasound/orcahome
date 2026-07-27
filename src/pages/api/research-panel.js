const RESEND_CONTACTS_URL = 'https://api.resend.com/contacts'

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

async function resendRequest(path, options) {
  const response = await fetch(`${RESEND_CONTACTS_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const text = await response.text()
  let data = null

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { message: text }
  }

  return { response, data }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: 'Server is missing Resend configuration.' })
  }

  const {
    email,
    firstName,
    lastName,
    consent,
    role,
    conservation,
    locality,
    generation,
    accessibilityNeeds,
    anythingElse,
    website,
  } = req.body || {}

  // Honeypot spam field. Real users should never fill this.
  if (website) {
    return res.status(200).json({ message: 'Thanks for joining.' })
  }

  const normalizedEmail = cleanString(email).toLowerCase()

  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  if (consent !== true) {
    return res.status(400).json({ message: 'Consent is required to join the research panel.' })
  }

  const contactPayload = {
    email: normalizedEmail,
    firstName: cleanString(firstName),
    lastName: cleanString(lastName),
    unsubscribed: false,
    properties: {
      role: cleanString(role),
      conservation: cleanString(conservation),
      locality: cleanString(locality),
      what_generation_do_you_belong_to: cleanString(generation),
      source: 'orcasound_web',
      accessibility_needs: cleanString(accessibilityNeeds),
      anything_else: cleanString(anythingElse),
    },
  }

  try {
    // First try to create the contact.
    const createResult = await resendRequest('', {
      method: 'POST',
      body: JSON.stringify(contactPayload),
    })

    if (createResult.response.ok) {
      return res.status(200).json({ message: 'Thanks for joining the Orcasound research panel.' })
    }

    const errorMessage = JSON.stringify(createResult.data || {}).toLowerCase()

    // If Resend says the contact already exists, update by email.
    if (
      createResult.response.status === 409 ||
      errorMessage.includes('already') ||
      errorMessage.includes('exist')
    ) {
      const updatePayload = { ...contactPayload }
      delete updatePayload.email

      const updateResult = await resendRequest(`/${encodeURIComponent(normalizedEmail)}`, {
        method: 'PATCH',
        body: JSON.stringify(updatePayload),
      })

      if (updateResult.response.ok) {
        return res.status(200).json({ message: 'Thanks — your research panel details were updated.' })
      }

      return res.status(updateResult.response.status).json({
        message: 'We could not update your panel signup right now.',
      })
    }

    return res.status(createResult.response.status).json({
      message: 'We could not save your signup right now.',
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}
const RESEND_CONTACTS_URL = 'https://api.resend.com/contacts'

const SEGMENT_ID = 'e110074e-b6ae-4b53-ada5-24061899f851'
const TOPIC_ID = 'c56b9bbc-3e5b-4d40-bd36-cd5f24f4ca31'

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
    data = text ? { message: text } : null
  }

  return { response, data }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])

    return res.status(405).json({
      message: 'Method not allowed.',
    })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.')

    return res.status(500).json({
      message: 'Server is missing Resend configuration.',
    })
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
    priorExposure,
    subscriber,
    website,
  } = req.body || {}

  // Honeypot field. Bots may fill this, but real users should not.
  if (cleanString(website)) {
    return res.status(200).json({
      message: 'Thanks for joining.',
    })
  }

  const normalizedEmail = cleanString(email).toLowerCase()

  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({
      message: 'Please enter a valid email address.',
    })
  }

  if (consent !== true) {
    return res.status(400).json({
      message: 'Consent is required to join the research panel.',
    })
  }

  const properties = {
    role: cleanString(role),
    conservation: cleanString(conservation),
    locality: cleanString(locality),
    what_generation_do_you_belong_to: cleanString(generation),
    prior_exposure: cleanString(priorExposure),
    subscriber: cleanString(subscriber) || 'research_panel',
    source: 'orcasound_web',
  }

  const contactPayload = {
    email: normalizedEmail,
    first_name: cleanString(firstName),
    last_name: cleanString(lastName),
    unsubscribed: false,
    segments: [
      {
        id: SEGMENT_ID,
      },
    ],
    topics: [
      {
        id: TOPIC_ID,
        subscription: 'opt_in',
      },
    ],
    properties,
  }

  try {
    const createResult = await resendRequest('', {
      method: 'POST',
      body: JSON.stringify(contactPayload),
    })

    if (createResult.response.ok) {
      return res.status(200).json({
        message: 'Thanks for joining the Orcasound research panel.',
      })
    }

    const resendError = JSON.stringify(createResult.data || {}).toLowerCase()

    const contactAlreadyExists =
      createResult.response.status === 409 ||
      resendError.includes('already exists') ||
      resendError.includes('contact already')

    if (!contactAlreadyExists) {
      console.error('Resend contact creation failed.', {
        status: createResult.response.status,
        data: createResult.data,
      })

      return res.status(502).json({
        message: 'We could not save your signup right now.',
      })
    }

    // Resend allows updating a contact using its email in the URL.
    const updatePayload = {
      first_name: cleanString(firstName),
      last_name: cleanString(lastName),
      unsubscribed: false,
      properties,
    }

    const updateResult = await resendRequest(
      `/${encodeURIComponent(normalizedEmail)}`,
      {
        method: 'PATCH',
        body: JSON.stringify(updatePayload),
      }
    )

    if (!updateResult.response.ok) {
      console.error('Resend contact update failed.', {
        status: updateResult.response.status,
        data: updateResult.data,
      })

      return res.status(502).json({
        message: 'We could not update your panel signup right now.',
      })
    }

    return res.status(200).json({
      message: 'Thanks — your research panel details were updated.',
    })
  } catch (error) {
    console.error('Research panel submission failed.', error)

    return res.status(500).json({
      message: 'Something went wrong. Please try again.',
    })
  }
}

import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import Head from 'next/head'

const Section = ({ title, children }) => (
  <Box component="section" sx={{ mt: 5 }}>
    <Typography variant="h5" component="h2" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
)

const Paragraph = ({ children }) => (
  <Typography variant="body1" paragraph>
    {children}
  </Typography>
)

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy and Consent Policy | Orcasound</title>
        <meta
          name="description"
          content="Orcasound Product Research Opt-In: Privacy and Consent Policy."
        />
      </Head>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Orcasound Product Research Opt-In: Privacy and Consent Policy
        </Typography>

        <Paragraph>
          Effective date: 2026-08-14. Responsible party: Orcasound Product,{' '}
          <MuiLink href="mailto:product@orcasound.tech">
            product@orcasound.tech
          </MuiLink>
          . This policy applies wherever you are in the world.
        </Paragraph>

        <Paragraph>
          Status: Approved as Orcasound Product&apos;s official Privacy and
          Consent Policy by Brendan Thatcher, Product Manager, on 2026-08-14.
        </Paragraph>

        <Section title="What we collect">
          <Paragraph>
            Email address, first name, and last name (required). We also ask how
            you&apos;d describe yourself, your connection to marine
            conservation, your connection to the Salish Sea, and your
            generation, so we can recruit a representative mix of research
            participants. Two fields are optional free text: accessibility
            needs, and anything else you&apos;d like us to know.
          </Paragraph>
        </Section>

        <Section title="Why and how we use it">
          <Paragraph>
            We use it to contact opt-in participants about Orcasound Product UX
            Research studies, and for research purposes, to inform changes to
            Orcasound Product deployments. This includes building personas and
            related UX deliverables, always in aggregate or de-identified form,
            never presented as a real, identifiable individual. Not sold, not
            shared outside the Orcasound Product team, never used for
            advertising. We do not use automated decision making or profiling
            based on your data. Every decision about your data is made by a
            person on the Orcasound Product team.
          </Paragraph>
        </Section>

        <Section title="Consent">
          <Paragraph>
            Explicit opt-in by typing your first name, last name, and the date
            in separate, unbundled consent fields on the form. Nothing is
            pre-filled. Declining does not affect your ability to use the
            Orcasound site or any Orcasound service. This is the legal basis we
            rely on to process your data: your freely given, specific, informed
            consent, which you may withdraw at any time as described below.
          </Paragraph>
        </Section>

        <Section title="Voluntary participation">
          <Paragraph>
            Taking part in any Orcasound Product study is entirely voluntary.
            You can decline to answer any question, skip any activity, or stop a
            session partway through, for any reason or no reason, without
            penalty and without affecting your standing as a participant in
            future studies.
          </Paragraph>
        </Section>

        <Section title="Where it is stored">
          <Paragraph>
            Your general opt-in contact information is stored in Resend, our
            participant contact platform, which is the sole system of record for
            the mailing list. When you&apos;re recruited for a specific study,
            your contact information may also be copied into a recruitment
            tracking spreadsheet, in Google Sheets or Excel, stored on Orcasound
            Product&apos;s Google Drive, so the team can track outreach and
            scheduling for that study. Access to both is limited to the
            Orcasound Product team. If a study session is recorded, the
            recording is processed by a transcription service before it is
            stored; we require any such vendor to protect your data under
            confidentiality and security obligations at least as strict as this
            policy. Orcasound Product is based in the United States, and your
            data may be processed and stored there regardless of where you are
            located. Where required, we rely on legal safeguards such as
            standard contractual clauses to protect data transferred
            internationally.
          </Paragraph>
        </Section>

        <Section title="Retention">
          <Paragraph>
            Your opt-in contact information is retained for the life of
            Orcasound Product, or until you withdraw, whichever comes first.
            Your information in Resend will not be deleted unless Orcasound
            Product dissolves or you withdraw from the mailing list. Withdraw at
            any time by contacting{' '}
            <MuiLink href="mailto:product@orcasound.tech">
              product@orcasound.tech
            </MuiLink>
            .
          </Paragraph>
          <Paragraph>
            Recruitment tracking spreadsheets are retained on the same terms as
            the study they support: for 5 years after that study&apos;s
            recording has been transcribed, or indefinitely if the study
            wasn&apos;t recorded, until you withdraw.
          </Paragraph>
          <Paragraph>
            You sign a separate consent form for each study you participate in.
            If that study session is recorded, the recording and its
            corresponding signed consent form are both retained for 5 years
            after the recording has been transcribed, so the consent record
            never expires before the data it authorizes.
          </Paragraph>
        </Section>

        <Section title="Your rights">
          <Paragraph>
            Wherever you live, you can email{' '}
            <MuiLink href="mailto:product@orcasound.tech">
              product@orcasound.tech
            </MuiLink>{' '}
            to:
          </Paragraph>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Typography component="li" variant="body1">
              Access the personal data we hold about you.
            </Typography>
            <Typography component="li" variant="body1">
              Correct it if it&apos;s inaccurate or incomplete.
            </Typography>
            <Typography component="li" variant="body1">
              Delete it.
            </Typography>
            <Typography component="li" variant="body1">
              Receive a copy in a portable, commonly used format.
            </Typography>
            <Typography component="li" variant="body1">
              Object to, or ask us to restrict, how we use it.
            </Typography>
            <Typography component="li" variant="body1">
              Withdraw your consent, at any time, for any reason.
            </Typography>
          </Box>
          <Paragraph>
            We aim to respond within 5 business days. If you are in the European
            Union, the United Kingdom, or another country with its own data
            protection authority, you also have the right to lodge a complaint
            with that authority, though we would appreciate the chance to
            resolve any concern directly first.
          </Paragraph>
        </Section>

        <Section title="Use of your feedback and contributions">
          <Paragraph>
            Ideas, suggestions, and feedback you share during a study may inform
            changes to Orcasound Product, including personas and related UX
            deliverables, always in aggregate or de-identified form. If we ever
            want to quote you or reference something you shared outside of
            internal research use, for example in a public case study, a
            conference talk, or materials for funders, we will only do so
            anonymously, without your name or other identifying details, unless
            we ask for and receive your separate, specific permission to use
            your name.
          </Paragraph>
        </Section>

        <Section title="No usage tracking">
          <Paragraph>
            Orcasound does not track individual website or app usage through
            analytics. We do track aggregate, unattributed website usage.
            Research about how individual people use our tools is gathered only
            through direct study engagement and self report, never passive
            tracking.
          </Paragraph>
        </Section>

        <Section title="Minors">
          <Paragraph>
            This form is not directed to children. Participants must be 18 or
            older to opt in, regardless of where you live. We set the threshold
            at 18 worldwide, above the age of consent or age of digital consent
            in every country we know we have participants from, rather than
            tracking a different minimum per country. If a minor is present
            during your session but is not observed, recorded, or asked to
            participate, that&apos;s fine, they are a bystander and not a
            research subject. We cannot include a minor as a participant in an
            adult study session.
          </Paragraph>
        </Section>

        <Section title="If Orcasound Product's structure changes">
          <Paragraph>
            Orcasound Product currently operates under a fiscal sponsorship
            arrangement while it completes nonprofit formation. If Orcasound
            Product&apos;s fiscal sponsor, corporate structure, or ownership
            changes, your data will continue to be protected under the terms of
            this policy, or a policy at least as protective, and we will notify
            participants of any material change before it takes effect.
          </Paragraph>
        </Section>

        <Section title="Changes to this policy">
          <Paragraph>
            This policy lives at this page and is dated at the top. Material
            changes update the effective date above.
          </Paragraph>
        </Section>

        <Section title="Governing law">
          <Paragraph>
            This policy, and any dispute about your participation in Orcasound
            Product research, is governed by the laws of the United States.
            Nothing in this policy limits any rights you have that cannot be
            waived under the law of your own country.
          </Paragraph>
        </Section>

        <Section title="Contact">
          <Paragraph>
            Orcasound Product,{' '}
            <MuiLink href="mailto:product@orcasound.tech">
              product@orcasound.tech
            </MuiLink>
            . We are a small team and currently handle all privacy inquiries
            directly rather than through a dedicated Data Protection Officer or
            in-country representative; if our participant base grows to a point
            where a formal EU, UK, or other regional representative is required,
            we will appoint one and update this policy.
          </Paragraph>
        </Section>
      </Container>
    </>
  )
}

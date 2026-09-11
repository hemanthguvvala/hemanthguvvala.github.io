import LegalDocument from '../components/LegalDocument';
import { legal, localStorageUse, processors } from '../data/legal';
import { person } from '../data/profile';

/**
 * The privacy policy.
 *
 * Every claim here is checked against the code, and the facts it depends on
 * live in src/data/legal.js so they cannot drift quietly. If this site ever
 * gains a form, a cookie, an embed or a tracker, this page changes in the same
 * commit — see the rules at the top of that file.
 */
export default function Privacy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      breadcrumb="Privacy"
      path="/privacy"
      description="What this website collects, what it does not, and who else is involved. It sets no cookies, has no contact form, and asks you for nothing."
    >
      <h2>The short version</h2>
      <p>
        This site sets <strong>no cookies</strong>, has <strong>no contact form</strong>, runs{' '}
        <strong>no advertising</strong>, and asks you to create <strong>no account</strong>. There
        is nothing here for you to sign up to and nothing for me to sell. What remains is the
        unavoidable: a web server sees requests, a font service serves fonts, and an anonymous
        counter counts visits.
      </p>

      <h2>Who is responsible</h2>
      <p>
        This website is published by {legal.owner}, an individual, from {person.location}. For
        anything in this policy — including a request to access or delete information — write to{' '}
        <a href={`mailto:${legal.noticeEmail}`}>{legal.noticeEmail}</a>.
      </p>

      <h2>What I collect directly</h2>
      <p>
        <strong>Nothing.</strong> There is no form, no newsletter, no comment box, no login and no
        upload. If you email me, I have your email and whatever you chose to put in it, for as long
        as that conversation is useful — that is a normal email exchange between two people, not a
        database.
      </p>

      <h2>What happens automatically</h2>
      <p>
        Three third parties are involved in serving this site. None of them is given your name,
        because I do not have it.
      </p>
      <ul>
        {processors.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong> — {p.role}. Receives: {p.data}.{' '}
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              Their privacy terms
            </a>
            .
          </li>
        ))}
      </ul>
      <p>
        The analytics are cookieless and aggregate: I can see that a page was read in a country on
        a kind of device, and I cannot see who read it or follow anyone between visits. The beacon
        is also skipped entirely for any browser sending{' '}
        <strong>Do Not Track</strong>, and it is absent from the build unless a token is configured
        — so a local or forked copy of this site reports nothing anywhere.
      </p>
      <p>
        The fonts are the one thing I would change if I could do it for free: serving them from
        Google means your browser makes a request to Google, and Google sees an IP address. If that
        matters to you, a content blocker will stop it and this site is designed to still read
        correctly without them.
      </p>

      <h2>Cookies, and what is stored on your device</h2>
      <p>
        No cookies are set by this site — which is why there is no cookie banner, rather than a
        banner that claims consent for something. One item is written to your browser&rsquo;s local
        storage, where it stays on your device and is never transmitted:
      </p>
      <ul>
        {localStorageUse.map((item) => (
          <li key={item.key}>
            <code>{item.key}</code> — {item.why}
          </li>
        ))}
      </ul>
      <p>
        Clearing site data in your browser removes it. Nothing breaks; the site falls back to your
        system&rsquo;s light or dark preference.
      </p>

      <h2>What I do not do</h2>
      <ul>
        <li>No advertising, ad networks or ad personalisation on this website.</li>
        <li>No selling, renting or sharing of information about visitors. There is nothing to sell.</li>
        <li>No profiling, scoring or automated decisions about you.</li>
        <li>No social-media pixels, embeds, share widgets or session recording.</li>
        <li>No email tracking — no open pixels, no click wrappers.</li>
      </ul>

      <h2>The Android apps are separate</h2>
      <p>
        The apps listed on this site are distributed through Google Play and are covered by their
        own privacy disclosures, shown on each app&rsquo;s store listing. This policy covers this
        website only.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete or object to
        the processing of personal data about you — including under India&rsquo;s Digital Personal
        Data Protection Act, 2023, and under the GDPR if you are in the EU or UK. In practice there
        is very little to exercise them against here, because I hold no visitor records. Where
        data sits with a third party above, their own tools and policies apply. Write to{' '}
        <a href={`mailto:${legal.noticeEmail}`}>{legal.noticeEmail}</a> and I will answer.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children and collects nothing from anyone, of any age.
      </p>

      <h2>Changes</h2>
      <p>
        If this site gains anything that touches a visitor — a form, an embed, a tracker — this
        page changes with it, and the date at the top changes too. I do not backdate it.
      </p>
    </LegalDocument>
  );
}

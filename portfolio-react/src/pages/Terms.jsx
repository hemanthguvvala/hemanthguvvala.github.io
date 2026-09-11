import { Link } from 'react-router-dom';
import LegalDocument from '../components/LegalDocument';
import { legal, prohibitedUses } from '../data/legal';
import { person } from '../data/profile';

/**
 * Terms of use, and the copyright notice that matters most.
 *
 * This page is where the reservation of rights is stated in words. The same
 * reservation is repeated in three machine-readable places so it cannot be
 * claimed that it was not discoverable:
 *   public/robots.txt              — crawler-level refusal, per agent
 *   public/ai.txt                  — the AI-usage convention
 *   public/.well-known/tdmrep.json — the W3C TDM Reservation Protocol
 * Change one and change all four.
 */
export default function Terms() {
  const year = new Date().getFullYear();

  return (
    <LegalDocument
      title="Terms of Use"
      breadcrumb="Terms"
      path="/terms"
      description="Who owns what is published here, the narrow permission you have to read it, and the uses that are refused — including use as training data for AI systems."
    >
      <h2>1. Agreement</h2>
      <p>
        This website at <code>hemanthguvvala.github.io</code> and everything published on it is
        owned and operated by {legal.owner} (&ldquo;I&rdquo;, &ldquo;me&rdquo;). By accessing,
        browsing, downloading from or crawling this site, you agree to these terms. If you do not
        agree to them, do not use the site.
      </p>
      <p>
        These terms apply to every visitor, and to every automated agent, crawler, scraper, bot or
        model-training pipeline that requests anything from this site. Operating software that
        fetches these pages is use of this site by whoever operates it.
      </p>

      <h2>2. Everything here is owned, and nothing is given away</h2>
      <p>
        Copyright © {legal.copyrightFrom}&ndash;{year} {legal.owner}.{' '}
        <strong>All rights reserved.</strong>
      </p>
      <p>
        That covers all of it: the writing, the journey entries, the product descriptions, the
        page copy, the source code of this website, its design, layout, component structure,
        typography and colour system, the measurements and findings reported here, the images and
        icons I made, my r&eacute;sum&eacute;, and the names of my products. Where a third-party
        library, font or icon set is used, it remains the property of its owner under its own
        licence; my work is everything other than that.
      </p>
      <p>
        <strong>Reading is not a licence.</strong> Your browser necessarily copies these pages in
        order to display them, and you may read them, print a page for yourself and link to any
        page. That is the whole of the permission granted. Nothing on this site is offered as open
        source, as a template, as a sample, or as public-domain material, and no other right is
        granted by implication, estoppel or otherwise.
      </p>
      <p>
        The source code of this site is readable because a website must be delivered to be shown,
        and because the repository is public so that the work can be inspected by people
        considering hiring me. <strong>Readable is not licensed.</strong> The repository carries an
        explicit all-rights-reserved licence, and the absence of an open-source licence file is
        deliberate rather than an omission.
      </p>

      <h2>3. Express reservation against AI training and data mining</h2>
      <p>
        I expressly reserve the right to use this site&rsquo;s content and code for text and data
        mining, and I <strong>refuse permission</strong> for it to be used to develop, train,
        fine-tune, ground, evaluate, benchmark, retrieve into or otherwise improve any
        machine-learning model, generative artificial-intelligence system or large language model,
        whether commercial or non-commercial.
      </p>
      <p>
        This reservation is made in an appropriate manner for the purposes of Article 4(3) of
        Directive (EU) 2019/790 and any equivalent provision in any other jurisdiction, and is
        additionally declared in machine-readable form at{' '}
        <a href="/robots.txt">/robots.txt</a>, <a href="/ai.txt">/ai.txt</a> and{' '}
        <a href="/.well-known/tdmrep.json">/.well-known/tdmrep.json</a>. Ignoring those signals
        does not create permission; it evidences that the use was made with notice of the refusal.
      </p>
      <p>
        No agreement, terms of service or licence you hold with a third party — including any AI
        provider, dataset vendor, search engine or archive — can grant rights in my work that I
        have not granted. Passing this material to such a service is itself a use governed by these
        terms.
      </p>

      <h2>4. Uses that are refused</h2>
      <p>Without my prior written permission, you may not:</p>
      <ul>
        {prohibitedUses.map((use) => (
          <li key={use}>{use}</li>
        ))}
      </ul>
      <p>
        Ordinary search-engine crawling for the purpose of indexing and linking is permitted, to
        the extent allowed by <a href="/robots.txt">/robots.txt</a>, and may be withdrawn.
      </p>

      <h2>5. Asking is free</h2>
      <p>
        Permission is often available and costs you nothing to request. Quoting a paragraph with
        attribution and a link, referencing a finding in your own writing, or discussing something
        published here is welcome and needs no permission at all. Reusing code, design or a
        substantial part of the writing needs a licence from me in writing. Write to{' '}
        <a href={`mailto:${legal.noticeEmail}`}>{legal.noticeEmail}</a>.
      </p>

      <h2>6. My r&eacute;sum&eacute; and product names</h2>
      <p>
        The r&eacute;sum&eacute; offered for download is provided so that employers, clients and
        collaborators can evaluate working with me. It may be used for that purpose only. It may
        not be republished, listed on a job board or CV database, or submitted to any employer or
        client on my behalf without my written consent.
      </p>
      <p>
        The product names used here identify my products. Nothing on this site grants any right to
        use those names, or my own name, in a way that suggests endorsement, affiliation or
        authorship.
      </p>

      <h2>7. No warranty, and no advice</h2>
      <p>
        This site is provided as it is, without warranty of any kind. The writing describes
        engineering work I did, with the numbers I measured at the time; it is an account, not
        professional, legal, financial or security advice, and it may be out of date. Code and
        techniques described here are used at your own risk. Links to other sites are for
        convenience and imply no endorsement or responsibility for their content.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, I am not liable for any indirect, incidental,
        special or consequential loss, or for any loss of profit, revenue, data or goodwill,
        arising from your use of this site or reliance on anything published on it. Nothing in
        these terms excludes any liability that cannot lawfully be excluded.
      </p>

      <h2>9. Enforcement</h2>
      <p>
        Unauthorised use of my work causes harm that money alone may not repair, and I may seek an
        injunction as well as damages, an account of profits, delivery-up or destruction of
        infringing material, and my costs. I may also invoice unauthorised commercial use at my
        then-current commercial rates, which is without prejudice to every other remedy available
        to me.
      </p>
      <p>
        Each page of this site is dated, and its authorship and history are recorded in a version
        control history with timestamps. My rights subsist automatically under the Copyright Act,
        1957 and, internationally, under the Berne Convention; no notice, registration or symbol
        is needed for them to exist, and none of the above is waived by my not acting immediately.
      </p>

      <h2>10. Reporting infringement</h2>
      <p>
        If you believe something published here infringes your rights, tell me and I will look at
        it properly and promptly: write to{' '}
        <a href={`mailto:${legal.noticeEmail}`}>{legal.noticeEmail}</a> with the page, the material
        and what you own. If you have found my work republished somewhere without permission, I
        would also like to know.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of {legal.governingLaw}, and any dispute arising out
        of them or out of your use of this site is subject to {legal.jurisdiction}. Where the law
        of your own country gives you rights that cannot be excluded by agreement, nothing here
        restricts them — including any statutory exception for fair dealing, quotation, criticism,
        review or reporting.
      </p>

      <h2>12. Changes, and the rest</h2>
      <p>
        I may update these terms; the version in force is the one published here, with the date
        shown at the top of this page. If any provision is found unenforceable, the rest continues
        to apply. These terms, together with the{' '}
        <Link to="/privacy">privacy policy</Link>, are the whole of the agreement between us about
        this site.
      </p>
      <p>
        Published from {person.location}. Formal notices and licensing requests:{' '}
        <a href={`mailto:${legal.noticeEmail}`}>{legal.noticeEmail}</a>.
      </p>
    </LegalDocument>
  );
}

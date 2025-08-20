import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">TERMS OF USE</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Agreement to Our Legal Terms</h2>
          <p className="mb-4">
            We are <strong>AR DELIVERO</strong> ("Company," "we," "us," "our"), a company registered in India at:
          </p>
          <p className="mb-4 font-medium">
            BY PASS ROAD HANDWARA, REHMANI TECHNOLOGIES BUILDING, HANDWARA, JAMMU AND KASHMIR 193221.
          </p>
          <p className="mb-4">
            We operate the website{" "}
            <a
              href="http://ardelivero.com"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AR Delivero website"
            >
              ardelivero.com
            </a>{" "}
            & AR Delivero ("App"), as well as any other related products and services that refer or link to these
            legal terms (the <strong>"Legal Terms"</strong>) (collectively, the <strong>"Services"</strong>).
          </p>
          <p className="mb-4">
            You can contact us by phone at +911955295310, email at{" "}
            <a
              href="mailto:helpdesk@ardelivero.com"
              className="text-blue-600 underline"
              aria-label="Contact AR Delivero"
            >
              helpdesk@ardelivero.com
            </a>
            , or by mail to BY PASS ROAD HANDWARA, REHMANI TECHNOLOGIES BUILDING, HANDWARA, JAMMU AND KASHMIR
            193221, India.
          </p>
          <p className="mb-4">
            These Legal Terms constitute a legally binding agreement made between you, whether personally or on
            behalf of an entity (<strong>"you"</strong>), and AR DELIVERO, concerning your access to and use of the
            Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by
            all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY
            PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
          </p>
          <p className="mb-4">
            We will provide you with prior notice of any scheduled changes to the Services you are using. Changes to
            Legal Terms will become effective three (3) days after the notice is given, except if the changes apply
            to security updates, bug fixes, and a court order, in which case the changes will be effective
            immediately. By continuing to use the Services after the effective date of any changes, you agree to be
            bound by the modified terms. If you disagree with such changes, you may terminate Services as per the
            section <strong>"TERM AND TERMINATION."</strong>
          </p>
          <p className="mb-4">
            All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must
            have the permission of, and be directly supervised by, their parent or guardian to use the Services. If
            you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you
            using the Services.
          </p>
          <p className="mb-4">We recommend that you print a copy of these Legal Terms for your records.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mt-8 mb-2">Table of Contents</h2>
          <ol className="list-decimal pl-6 mb-4 space-y-1">
            <li>
              <a href="#services" className="text-blue-600 underline" aria-label="Our Services">
                OUR SERVICES
              </a>
            </li>
            <li>
              <a
                href="#intellectual-property"
                className="text-blue-600 underline"
                aria-label="Intellectual Property Rights"
              >
                INTELLECTUAL PROPERTY RIGHTS
              </a>
            </li>
            <li>
              <a href="#user-representations" className="text-blue-600 underline" aria-label="User Representations">
                USER REPRESENTATIONS
              </a>
            </li>
            <li>
              <a href="#user-registration" className="text-blue-600 underline" aria-label="User Registration">
                USER REGISTRATION
              </a>
            </li>
            <li>
              <a href="#purchases" className="text-blue-600 underline" aria-label="Purchases and Payment">
                PURCHASES AND PAYMENT
              </a>
            </li>
            <li>
              <a href="#policy" className="text-blue-600 underline" aria-label="Policy">
                POLICY
              </a>
            </li>
            <li>
              <a
                href="#prohibited-activities"
                className="text-blue-600 underline"
                aria-label="Prohibited Activities"
              >
                PROHIBITED ACTIVITIES
              </a>
            </li>
            <li>
              <a
                href="#user-contributions"
                className="text-blue-600 underline"
                aria-label="User Generated Contributions"
              >
                USER GENERATED CONTRIBUTIONS
              </a>
            </li>
            <li>
              <a
                href="#contribution-license"
                className="text-blue-600 underline"
                aria-label="Contribution License"
              >
                CONTRIBUTION LICENSE
              </a>
            </li>
            <li>
              <a href="#reviews" className="text-blue-600 underline" aria-label="Guidelines for Reviews">
                GUIDELINES FOR REVIEWS
              </a>
            </li>
            <li>
              <a
                href="#mobile-license"
                className="text-blue-600 underline"
                aria-label="Mobile Application License"
              >
                MOBILE APPLICATION LICENSE
              </a>
            </li>
            <li>
              <a href="#social-media" className="text-blue-600 underline" aria-label="Social Media">
                SOCIAL MEDIA
              </a>
            </li>
            <li>
              <a href="#advertisers" className="text-blue-600 underline" aria-label="Advertisers">
                ADVERTISERS
              </a>
            </li>
            <li>
              <a href="#services-management" className="text-blue-600 underline" aria-label="Services Management">
                SERVICES MANAGEMENT
              </a>
            </li>
            <li>
              <a href="#privacy-policy" className="text-blue-600 underline" aria-label="Privacy Policy">
                PRIVACY POLICY
              </a>
            </li>
            <li>
              <a href="#term-termination" className="text-blue-600 underline" aria-label="Term and Termination">
                TERM AND TERMINATION
              </a>
            </li>
            <li>
              <a
                href="#modifications"
                className="text-blue-600 underline"
                aria-label="Modifications and Interruptions"
              >
                MODIFICATIONS AND INTERRUPTIONS
              </a>
            </li>
            <li>
              <a href="#governing-law" className="text-blue-600 underline" aria-label="Governing Law">
                GOVERNING LAW
              </a>
            </li>
            <li>
              <a href="#dispute-resolution" className="text-blue-600 underline" aria-label="Dispute Resolution">
                DISPUTE RESOLUTION
              </a>
            </li>
            <li>
              <a href="#corrections" className="text-blue-600 underline" aria-label="Corrections">
                CORRECTIONS
              </a>
            </li>
            <li>
              <a href="#disclaimer" className="text-blue-600 underline" aria-label="Disclaimer">
                DISCLAIMER
              </a>
            </li>
            <li>
              <a
                href="#limitations"
                className="text-blue-600 underline"
                aria-label="Limitations of Liability"
              >
                LIMITATIONS OF LIABILITY
              </a>
            </li>
            <li>
              <a href="#indemnification" className="text-blue-600 underline" aria-label="Indemnification">
                INDEMNIFICATION
              </a>
            </li>
            <li>
              <a href="#user-data" className="text-blue-600 underline" aria-label="User Data">
                USER DATA
              </a>
            </li>
            <li>
              <a
                href="#electronic-communications"
                className="text-blue-600 underline"
                aria-label="Electronic Communications"
              >
                ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
              </a>
            </li>
            <li>
              <a href="#sms" className="text-blue-600 underline" aria-label="SMS Text Messaging">
                SMS TEXT MESSAGING
              </a>
            </li>
            <li>
              <a href="#miscellaneous" className="text-blue-600 underline" aria-label="Miscellaneous">
                MISCELLANEOUS
              </a>
            </li>
            <li>
              <a href="#contact" className="text-blue-600 underline" aria-label="Contact Us">
                CONTACT US
              </a>
            </li>
          </ol>
        </section>

        <section id="services" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1. Our Services</h3>
          <p className="mb-2">
            The information provided when using the Services is not intended for distribution to or use by any person
            or entity in any jurisdiction or country where such distribution or use would be contrary to law or
            regulation or which would subject us to any registration requirement within such jurisdiction or country.
            Accordingly, those persons who choose to access the Services from other locations do so on their own
            initiative and are solely responsible for compliance with local laws, if and to the extent local laws are
            applicable.
          </p>
        </section>

        <section id="intellectual-property" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">2. Intellectual Property Rights</h3>
          <h4 className="font-semibold mb-1">Our Intellectual Property</h4>
          <p className="mb-2">
            We are the owner or the licensee of all intellectual property rights in our Services, including all
            source code, databases, functionality, software, website designs, audio, video, text, photographs, and
            graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and
            logos contained therein (the "Marks").
          </p>
          <p className="mb-2">Our Content and Marks are protected by copyright and trademark laws and treaties in India.</p>
          <p className="mb-2">
            The Content and Marks are provided "AS IS" for your personal, non-commercial use or internal business
            purposes only.
          </p>
          <h4 className="font-semibold mb-1 mt-2">Your Use of Our Services</h4>
          <p className="mb-2">
            Subject to compliance with these Legal Terms, you are granted a non-exclusive, non-transferable,
            revocable license to:
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>Access the Services</li>
            <li>Download or print a copy of any portion of the Content you have properly gained access to</li>
            <li>Solely for your personal, non-commercial use or internal business purposes.</li>
          </ul>
          <p className="mb-2">
            Any unauthorized use of our Content or Marks is strictly prohibited. If you wish to use the Services,
            Content, or Marks beyond what is permitted, please contact:{" "}
            <a
              href="mailto:helpdesk@ardelivero.com"
              className="text-blue-600 underline"
              aria-label="Contact for intellectual property inquiries"
            >
              helpdesk@ardelivero.com
            </a>.
          </p>
          <p className="mb-2">
            Any breach of these Intellectual Property Rights will result in the termination of your right to use our
            Services immediately.
          </p>
          <h4 className="font-semibold mb-1 mt-2">Your Submissions</h4>
          <p className="mb-2">
            By submitting any content, ideas, or feedback to us, you agree to assign all intellectual property rights
            to AR DELIVERO, allowing us to use and share it freely for any lawful purpose.
          </p>
          <p className="mb-2">
            You are responsible for ensuring your submissions do not violate any laws, intellectual property rights,
            or these Legal Terms.
          </p>
        </section>

        <section id="user-representations" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">3. User Representations</h3>
          <p className="mb-2">
            By using the Services, you represent and warrant that: (1) all registration information you submit will
            be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and
            promptly update such registration information as necessary; (3) you have the legal capacity and you
            agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside,
            or if a minor, you have received parental permission to use the Services; (5) you will not access the
            Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will
            not use the Services for any illegal or unauthorized purpose; and (7) your use of the Services will not
            violate any applicable law or regulation.
          </p>
          <p className="mb-2">
            If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right
            to suspend or terminate your account and refuse any and all current or future use of the Services (or
            any portion thereof).
          </p>
        </section>

        <section id="user-registration" className="mb-6">
          <h3 className="text-xl font-semibold mb-2">4. User Registration</h3>
          <p className="mb-2">
            You may be required to register to use the Services. You agree to keep your password confidential and
            will be responsible for all use of your account and password. We reserve the right to remove, reclaim,
            or change a username you select if we determine, in our sole discretion, that such username is
            inappropriate, obscene, or otherwise objectionable.
          </p>
        </section>

        <section id="purchases" className="mb-6">
          
            <h4 className="font-semibold mb-1">5. Accepted Payment Methods</h4>
            <ul className="list-disc pl-6 mb-2">
              <li>M Pay</li>
              <li>G Pay</li>
              <li>Phone Pay</li>
              <li>Visa</li>
              <li>Mastercard</li>
              <li>Cash</li>
            </ul>
            <p className="mb-2">
              You agree to provide current, complete, and accurate purchase and account information for all purchases
              made via the Services. You further agree to promptly update account and payment information, including
              email address, payment method, and payment card expiration date, so that we can complete your
              transactions and contact you as needed.
            </p>
            <p className="mb-2">
              Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any
              time. All payments shall be in INDIAN RUPEES.
            </p>
            <p className="mb-2">
              You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping
              fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your
              order.
            </p>
            <p className="mb-2">
              We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or
              received payment.
            </p>
            <p className="mb-2">
              We reserve the right to refuse any order placed through the Services. We may, in our sole discretion,
              limit or cancel quantities purchased per person, per household, or per order. These restrictions may
              include orders placed by or under the same customer account, the same payment method, and/or orders that
              use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our
              sole judgment, appear to be placed by dealers, resellers, or distributors.
            </p>
          </section>

          <section id="policy" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">6. Policy</h3>
            <p className="mb-2">All sales are final and no refund will be issued.</p>
          </section>

          <section id="prohibited-activities" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">7. Prohibited Activities</h3>
            <p className="mb-2">
              You may not access or use the Services for any purpose other than that for which we make the Services
              available. The Services may not be used in connection with any commercial endeavors except those that
              are specifically endorsed or approved by us.
            </p>
            <h4 className="font-semibold mb-1 mt-2">As a user of the Services, you agree not to:</h4>
            <ul className="list-disc pl-6 mb-2">
              <li>Systematically retrieve data or other content from the Services to create a compilation, database,
                or directory without written permission.</li>
              <li>Trick, defraud, or mislead us and other users, especially to obtain sensitive account information.</li>
              <li>Circumvent, disable, or interfere with security-related features of the Services.</li>
              <li>Disparage, tarnish, or harm the reputation of the Services.</li>
              <li>Use any information from the Services to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Engage in unauthorized framing of or linking to the Services.</li>
              <li>Upload or transmit viruses, Trojan horses, or other material that disrupts the Services.</li>
              <li>Engage in any automated use of the system, such as bots, scrapers, or data mining tools.</li>
              <li>Attempt to impersonate another user or person.</li>
              <li>Upload or transmit spyware, passive collection mechanisms, or other harmful scripts.</li>
              <li>Interfere with the proper functioning of the Services.</li>
              <li>Harass, intimidate, or threaten our employees or agents.</li>
              <li>Attempt to bypass access restrictions placed on the Services.</li>
              <li>Copy or adapt the Services' software, including Flash, PHP, HTML, JavaScript, or other code.</li>
              <li>Reverse engineer, decompile, or disassemble any software in the Services.</li>
              <li>Use automated systems like spiders, robots, or cheat utilities to interact with the Services.</li>
              <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
              <li>Collect user data or create accounts under false pretenses.</li>
              <li>Use the Services to advertise, sell goods, or engage in revenue-generating activities.</li>
              <li>Sell or transfer your profile to another person.</li>
            </ul>
          </section>

          <section id="user-contributions" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">8. User Generated Contributions</h3>
            <p className="mb-2">The Services do not offer users to submit or post content.</p>
          </section>

          <section id="contribution-license" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">9. Contribution License</h3>
            <p className="mb-2">
              You and Services agree that we may access, store, process, and use any information and personal data that
              you provide following the terms of the Privacy Policy and your choices (including settings).
            </p>
            <p className="mb-2">
              By submitting suggestions or other feedback regarding the Services, you agree that we can use and share
              such feedback for any purpose without compensation to you.
            </p>
          </section>

          <section id="reviews" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">10. Guidelines for Reviews</h3>
            <p className="mb-2">
              We may provide you areas on the Services to leave reviews or ratings. When posting a review, you must
              comply with the following criteria: (1) you should have firsthand experience with the person/entity
              being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive,
              or hateful language; (3) your reviews should not contain discriminatory references based on religion,
              race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews
              should not contain references to illegal activity; (5) you should not be affiliated with competitors if
              posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you
              may not post any false or misleading statements; and (8) you may not organize a campaign encouraging
              others to post reviews, whether positive or negative.
            </p>
            <p className="mb-2">
              We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to
              screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate.
              Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our
              affiliates or partners. We do not assume liability for any review or for any claims, liabilities, or
              losses resulting from any review. By posting a review, you hereby grant to us a perpetual,
              non-exclusive, worldwide, royalty-free, fully paid, assignable, and sublicensable right and license to
              reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content
              relating to review.
            </p>
          </section>

          <section id="mobile-license" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">11. Mobile Application License</h3>
            <h4 className="font-semibold mb-1">Use License</h4>
            <p className="mb-2">
              If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable,
              limited right to install and use the App on wireless electronic devices owned or controlled by you, and
              to access and use the App on such devices strictly in accordance with the terms and conditions of this
              mobile application license contained in these Legal Terms. You shall not: (1) except as permitted by
              applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or
              decrypt the App; (2) make any modification, adaptation, improvement, enhancement, translation, or
              derivative work from the App; (3) violate any applicable laws, rules, or regulations in connection with
              your access or use of the App; (4) remove, alter, or obscure any proprietary notice (including any
              notice of copyright or trademark) posted by us or the licensors of the App; (5) use the App for any
              revenue-generating endeavor, commercial enterprise, or other purpose for which it is not designed or
              intended; (6) make the App available over a network or other environment permitting access or use by
              multiple devices or users at the same time; (7) use the App for creating a product, service, or software
              that is, directly or indirectly, competitive with or in any way a substitute for the App; (8) use the
              App to send automated queries to any website or to send any unsolicited commercial email; or (9) use any
              proprietary information or any of our interfaces or our other intellectual property in the design,
              development, manufacture, licensing, or distribution of any applications, accessories, or devices for
              use with the App.
            </p>
            <h4 className="font-semibold mb-1 mt-2">Apple and Android Devices</h4>
            <p className="mb-2">
              The following terms apply when you use the App obtained from either the Apple Store or Google Play (each
              an "App Distributor") to access the Services: (1) the license granted to you for our App is limited to a
              non-transferable license to use the application on a device that utilizes the Apple iOS or Android
              operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App
              Distributor’s terms of service; (2) we are responsible for providing any maintenance and support
              services with respect to the App as specified in the terms and conditions of this mobile
              application license contained in these Legal Terms or as otherwise required under applicable law, and
              you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and
              support services with respect to the App; (3) in the event of any failure of the App to conform to any
              applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in
              accordance with its terms and policies, may refund the purchase price, if any, paid for the App, and to
              the maximum extent permitted by applicable law, the App Distributor will have no other warranty
              obligation whatsoever with respect to the App; (4) you represent and warrant that (i) you are not
              located in a country that is subject to a US government embargo, or that has been designated by the US
              government as a "terrorist supporting" country and (ii) you are not listed on any US government list of
              prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement
              when using the App, e.g., if you have a VoIP application, then you must not be in violation of their
              wireless data service agreement when using the App; and (6) you acknowledge and agree that the App
              Distributors are third-party beneficiaries of the terms and conditions in this mobile
              application license contained in these Legal Terms, and that each App Distributor will have the right
              (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile
              application license contained in these Legal Terms against you as a third-party beneficiary thereof.
            </p>
          </section>

          <section id="social-media" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">12. Social Media</h3>
            <p className="mb-2">
              As part of the functionality of the Services, you may link your account with online accounts you have
              with third-party service providers (each such account, a "Third-Party Account") by either: (1) providing
              your Third-Party Account login information through the Services; or (2) allowing us to access
              your Third-Party Account, as is permitted under the applicable terms and conditions that govern your use
              of each Third-Party Account. You represent and warrant that you are entitled to disclose
              your Third-Party Account login information to us and/or grant us access to your Third-Party Account,
              without breach by you of any of the terms and conditions that govern your use of the
              applicable Third-Party Account, and without obligating us to pay any fees or making us subject to any
              usage limitations imposed by the third-party service provider of the Third-Party Account. By granting us
              access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if
              applicable) any content that you have provided to and stored in your Third-Party Account (the "Social
              Network Content") so that it is available on and through the Services via your account, including
              without limitation any friend lists and (2) we may submit to and receive from your Third-Party Account
              additional information to the extent you are notified when you link your account with
              the Third-Party Account. Depending on the Third-Party Accounts you choose and subject to the privacy
              settings that you have set in such Third-Party Accounts, personally identifiable information that you
              post to your Third-Party Accounts may be available on and through your account on the Services. Please
              note that if a Third-Party Account or associated service becomes unavailable or our access to
              such Third-Party Account is terminated by the third-party service provider, then Social Network Content
              may no longer be available on and through the Services. You will have the ability to disable the
              connection between your account on the Services and your Third-Party Accounts at any time. PLEASE NOTE
              THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS
              IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to
              review any Social Network Content for any purpose, including but not limited to, for accuracy, legality,
              or non-infringement, and we are not responsible for any Social Network Content. You acknowledge and
              agree that we may access your email address book associated with a Third-Party Account and your contacts
              list stored on your mobile device or tablet computer solely for purposes of identifying and informing
              you of those contacts who have also registered to use the Services. You can deactivate the connection
              between the Services and your Third-Party Account by contacting us using the contact information below
              or through your account settings (if applicable). We will attempt to delete any information stored on
              our servers that was obtained through such Third-Party Account, except the username and profile picture
              that become associated with your account.
            </p>
          </section>

          <section id="advertisers" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">13. Advertisers</h3>
            <p className="mb-2">
              We allow advertisers to display their advertisements and other information in certain areas of the
              Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place
              such advertisements, and we have no other relationship with advertisers.
            </p>
          </section>

          <section id="services-management" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">14. Services Management</h3>
            <p className="mb-2">We reserve the right, but not the obligation, to:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Monitor the Services for violations of these Legal Terms.</li>
              <li>Take appropriate legal action against violators, including reporting them to law enforcement.</li>
              <li>Refuse, restrict access to, limit availability, or disable any Contributions deemed excessive or
                burdensome.</li>
              <li>Remove or disable files and content that are burdensome to our systems.</li>
              <li>Manage the Services to protect our rights and ensure proper functionality.</li>
            </ul>
          </section>

          <section id="privacy-policy" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">15. Privacy Policy</h3>
            <p className="mb-2">
              We care about data privacy and security. Please review our Privacy Policy:{" "}
              <a
                href="/privacy-policy"
                className="text-blue-600 underline"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              . By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these
              Legal Terms.
            </p>
            <p className="mb-2">
              The Services are hosted in India. If you access the Services from any other region of the world with
              differing laws on data collection and use, you consent to having your data transferred to and processed
              in India.
            </p>
          </section>

          <section id="term-termination" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">16. Term and Termination</h3>
            <p className="mb-2">
              These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY
              OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE
              OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY
              PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
              WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.
            </p>
            <p className="mb-2">
              We may terminate your use or participation in the Services or delete your account and any content or
              information that you posted at any time, without warning, in our sole discretion.
            </p>
            <p className="mb-2">
              If we terminate or suspend your account for any reason, you are prohibited from registering and creating
              a new account under your name, a fake or borrowed name, or the name of any third party. We reserve the
              right to take legal action, including pursuing civil, criminal, and injunctive redress.
            </p>
          </section>

          <section id="modifications" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">17. Modifications and Interruptions</h3>
            <p className="mb-2">
              We reserve the right to change, modify, or remove the contents of the Services at any time or for any
              reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or
              part of the Services without notice at any time.
            </p>
            <p className="mb-2">
              We cannot guarantee the Services will be available at all times. We may experience hardware, software, or
              other issues that result in interruptions. We reserve the right to revise, update, suspend, discontinue,
              or modify the Services at any time.
            </p>
            <p className="mb-2">
              You agree that we have no liability for any loss or inconvenience caused by your inability to access the
              Services during downtime or discontinuance.
            </p>
          </section>

          <section id="governing-law" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">18. Governing Law</h3>
            <p className="mb-2">
              These Legal Terms shall be governed by and defined following the laws of India. AR DELIVERO and you
              irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute
              which may arise in connection with these Legal Terms.
            </p>
          </section>

          <section id="dispute-resolution" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">19. Dispute Resolution</h3>
            <h4 className="font-semibold mb-1">Informal Negotiations</h4>
            <p className="mb-2">
              To expedite resolution and control costs, both parties agree to attempt informal negotiations for at
              least fifteen (15) days before initiating arbitration.
            </p>
            <h4 className="font-semibold mb-1 mt-2">Binding Arbitration</h4>
            <p className="mb-2">
              Any dispute shall be referred to the International Commercial Arbitration Court under the European
              Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146). The number of arbitrators shall be two (2).
              The arbitration seat shall be Jammu and Kashmir, India, and the proceedings shall be conducted in
              English and Urdu. The governing law shall be the substantive law of India.
            </p>
            <h4 className="font-semibold mb-1 mt-2">Restrictions</h4>
            <p className="mb-2">Arbitration shall be limited to individual disputes. No class actions or representative claims are
              allowed.</p>
            <h4 className="font-semibold mb-1 mt-2">Exceptions</h4>
            <p className="mb-2">
              Certain disputes related to intellectual property rights, allegations of theft, piracy, privacy invasion,
              or unauthorized use are exempt from arbitration and will be resolved in court.
            </p>
          </section>

          <section id="corrections" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">20. Corrections</h3>
            <p className="mb-2">
              We reserve the right to correct errors, inaccuracies, or omissions in the Services, including
              descriptions, pricing, and availability, at any time without prior notice.
            </p>
          </section>

          <section id="disclaimer" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">21. Disclaimer</h3>
            <p className="mb-2">
              The Services are provided on an "AS-IS" and "AS-AVAILABLE" basis. Your use of the Services is at your
              sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied,
              including but not limited to implied warranties of merchantability, fitness for a particular purpose,
              and non-infringement.
            </p>
            <p className="mb-2">We make no warranties regarding the accuracy or completeness of the Services' content or any third-party
              links. We assume no liability for:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Errors, mistakes, or inaccuracies of content.</li>
              <li>Personal injury or property damage resulting from access to or use of the Services.</li>
              <li>Unauthorized access to or use of our servers and stored personal/financial information.</li>
              <li>Service interruptions or transmission errors.</li>
              <li>Malicious software, such as viruses or Trojan horses, transmitted through the Services.</li>
              <li>Any loss or damage resulting from the use of content posted, transmitted, or made available through
                the Services.</li>
            </ul>
            <p className="mb-2">
              We do not endorse or assume responsibility for any third-party advertisements, websites, or services.
              Users should exercise caution when engaging in transactions with third parties.
            </p>
          </section>

          <section id="limitations" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">22. Limitations of Liability</h3>
            <p className="mb-2">
              We, including our directors, employees, or agents, shall not be liable for any indirect, consequential,
              special, or punitive damages, including but not limited to lost profits, lost data, or loss of business
              arising from your use of the Services.
            </p>
            <p className="mb-2">
              Our liability to you, regardless of the cause, shall be limited to the amount paid by you to us in the
              one (1) month period prior to the claim arising. Some jurisdictions do not allow limitations on implied
              warranties or the exclusion of certain damages, so these limitations may not apply to you.
            </p>
          </section>

          <section id="indemnification" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">23. Indemnification</h3>
            <p className="mb-2">
              You agree to defend, indemnify, and hold us harmless from any loss, damage, liability, claim, or demand,
              including reasonable attorneys’ fees, due to or arising from:
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>Your use of the Services.</li>
              <li>Your breach of these Legal Terms.</li>
              <li>Your violation of any third-party rights, including intellectual property rights.</li>
              <li>Any harmful act toward another user via the Services.</li>
            </ul>
            <p className="mb-2">
              We reserve the right to assume exclusive defense of any matter requiring indemnification, and you agree
              to cooperate at your expense.
            </p>
          </section>

          <section id="user-data" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">24. User Data</h3>
            <p className="mb-2">
              We maintain certain user data for the purpose of managing the Services, but you are solely responsible
              for any data you transmit. We are not liable for any data loss or corruption.
            </p>
          </section>

          <section id="electronic-communications" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">25. Electronic Communications, Transactions, and Signatures</h3>
            <p className="mb-2">
              By using the Services, you consent to receive electronic communications and agree that electronic
              agreements, signatures, and records are legally binding. You waive any rights requiring original
              signatures or non-electronic records.
            </p>
          </section>

          <section id="sms" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">26. SMS Text Messaging</h3>
            <h4 className="font-semibold mb-1">Opting Out</h4>
            <p className="mb-2">
              If at any time you wish to stop receiving SMS messages from us, simply reply to the text with "STOP." You may receive an SMS message confirming your opt-out.
            </p>
            <h4 className="font-semibold mb-1 mt-2">Message and Data Rates</h4>
            <p className="mb-2">
              Message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.
            </p>
            <h4 className="font-semibold mb-1 mt-2">Support</h4>
            <p className="mb-2">
              If you have any questions or need assistance regarding our SMS communications, please email us at{" "}
              <a
                href="mailto:helpdesk@ardelivero.com"
                className="text-blue-600 underline"
                aria-label="Contact for SMS support"
              >
                helpdesk@ardelivero.com
              </a>{" "}
              or call at +911955295310.
            </p>
          </section>

          <section id="miscellaneous" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">27. Miscellaneous</h3>
            <p className="mb-2">
              These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to enforce any right or provision shall not be considered a waiver.
            </p>
            <p className="mb-2">
              These Legal Terms operate to the fullest extent permissible by law. We may assign our rights and obligations at any time. We are not responsible for any loss, delay, or failure to act caused by circumstances beyond our control.
            </p>
            <p className="mb-2">
              If any provision of these Legal Terms is deemed unlawful or unenforceable, it shall be severed, and the rest of the terms shall remain valid. These Terms do not create any partnership, joint venture, employment, or agency relationship between you and us.
            </p>
            <p className="mb-2">
              You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You waive any defenses based on the electronic form of these Terms and the absence of a physical signature.
            </p>
          </section>

          <section id="contact" className="mb-6">
            <h3 className="text-xl font-semibold mb-2">28. Contact Us</h3>
            <p className="mb-2">For any complaints or further information regarding the use of our Services, please contact us:</p>
            <p className="mb-2 font-medium">
              AR DELIVERO<br />
              BY PASS ROAD HANDWARA<br />
              REHMANI TECHNOLOGIES BUILDING<br />
              HANDWARA, JAMMU AND KASHMIR 193221<br />
              India
            </p>
            <p className="mb-2">Phone: +911955295310</p>
            <p className="mb-2">
              Email:{" "}
              <a
                href="mailto:helpdesk@ardelivero.com"
                className="text-blue-600 underline"
                aria-label="Contact AR Delivero"
              >
                helpdesk@ardelivero.com
              </a>
            </p>
          </section>
      </main>
      <Footer />
    </>
  );
}
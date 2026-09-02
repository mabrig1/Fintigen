export type KnowledgeSource = {
  label: string;
  url: string;
  owner: string;
};

export type ServicePlaybook = {
  code: string;
  title: string;
  summary: string;
  whatWeSell: string[];
  intake: string[];
  workflow: string[];
  neverDo: string[];
  closeCaseWhen: string[];
  officialLinks: KnowledgeSource[];
};

export const knowledgeBaseReviewedOn = "2 September 2026";

export const businessRules = [
  "Fintigen provides ICT assistance, document preparation, portal navigation and case management. It must never present itself as NIMC, NYSC, CAC, Remita or another government agency.",
  "Always separate the Fintigen service fee from government, statutory or biller fees on the customer's quote and case record.",
  "Never collect or store customer passwords, OTPs, card PINs, full debit-card details or unnecessary identity numbers. Ask the customer to type confidential credentials personally.",
  "Do not promise approval, posting, certificate issuance, identity modification or government turnaround times. Fintigen controls assistance quality, not the decision of an authority.",
  "Before taking money for an official payment, verify the correct authority, service/purpose and current fee on the official portal. Do not guess a Remita MDA or service purpose.",
  "For identity or biometric processes, the applicant must complete any step that the authority requires personally. Never perform proxy biometric capture.",
  "Keep a case reference, payment evidence, official application/RRR reference where applicable, delivery evidence and a short closure note for every completed job.",
];

export const startupChecklist = [
  "Display Fintigen/MABRIG Technologies branding and a clear 'ICT assistance service — not a government agency' notice.",
  "Use a dedicated business WhatsApp number and standard customer intake message.",
  "Keep reliable internet, backup connection, printer, scanner, PDF tools and a clean document folder workflow.",
  "Create separate service-fee and official-fee fields in every case; never mix the two amounts.",
  "Use the Fintigen admin case number for every customer and send it to the customer after intake.",
  "Keep official portal links bookmarked and review them before major registration windows.",
  "For NYSC work, review and pursue NYSC Cyber Café Operator accreditation rather than operating as an unrecognized proxy registration centre.",
  "Train staff to detect phishing pages, fake portals, wrong Remita billers and altered payment receipts.",
];

export const dailyOperatingProcedure = [
  { step: "1. Enquiry", detail: "Identify exactly what the customer wants. Do not start from the portal; start from the outcome and the official authority responsible." },
  { step: "2. Create case", detail: "Register the customer in Fintigen ICT Business Services and issue the FTG-ICT case number." },
  { step: "3. Verify requirements", detail: "Use the knowledge base and the current official portal to confirm documents, applicant-presence requirements and current government fees." },
  { step: "4. Quote", detail: "Show Fintigen service fee and government/statutory fee separately. Explain what is refundable and what is not." },
  { step: "5. Prepare", detail: "Scan, resize, convert, type or organize documents. Ask the customer to inspect names, dates and numbers before submission." },
  { step: "6. Official submission/payment", detail: "Use only the verified official portal. For Remita, confirm the correct MDA/biller and purpose before generating the RRR." },
  { step: "7. Record evidence", detail: "Save only the necessary application/RRR/reference number, payment status and non-sensitive evidence in the case record." },
  { step: "8. Follow up", detail: "Move the case through Documents Pending, Ready, Submitted, Processing, Query or Completed. Contact the customer whenever action is required." },
  { step: "9. Deliver", detail: "Send or print the approved output, receipt, certificate, slip or acknowledgement. Ask the customer to verify it immediately." },
  { step: "10. Close", detail: "Mark completed, record final amount paid and add a short closure note. Ask for a referral/review without exposing the customer's documents." },
];

export const suggestedServicePricing = [
  { service: "Simple online form / portal assistance", range: "₦1,000–₦3,000", note: "Excludes official fees and printing." },
  { service: "Remita RRR generation / payment assistance", range: "₦500–₦2,000", note: "Charge for ICT assistance, not for the government service itself." },
  { service: "NYSC online registration assistance", range: "₦2,000–₦5,000", note: "Applicant must perform biometrics personally; official NYSC charges are separate." },
  { service: "NIN/NIMC document & payment guidance", range: "₦1,000–₦3,000", note: "Never describe this as a NIN enrolment fee; enrolment itself is free." },
  { service: "CAC Business Name assistance", range: "₦5,000–₦15,000", note: "CAC filing/statutory fees are separate and must be verified live." },
  { service: "CAC Company incorporation assistance", range: "₦15,000–₦40,000+", note: "Complexity varies by structure, shareholding and professional requirements." },
  { service: "Scanning / PDF conversion / upload", range: "₦500–₦3,000", note: "Price by pages, file complexity and urgency." },
];

export const officialSources: KnowledgeSource[] = [
  { label: "NYSC Official Website", url: "https://www.nysc.gov.ng/", owner: "National Youth Service Corps" },
  { label: "NYSC Registration Portal", url: "https://portal.nysc.org.ng/", owner: "National Youth Service Corps" },
  { label: "NYSC Registration Requirements", url: "https://nysc.gov.ng/mobreg.html", owner: "National Youth Service Corps" },
  { label: "NYSC Cyber Café Operator Accreditation", url: "https://www.nysc.gov.ng/cbo.html", owner: "National Youth Service Corps" },
  { label: "NIMC Official Website", url: "https://nimc.gov.ng/", owner: "National Identity Management Commission" },
  { label: "NIMC Fees", url: "https://nimc.gov.ng/fees", owner: "National Identity Management Commission" },
  { label: "NIMC Enrolment Centres", url: "https://nimc.gov.ng/enrolment-centres/", owner: "National Identity Management Commission" },
  { label: "CAC Business Name", url: "https://www.cac.gov.ng/services/business-name", owner: "Corporate Affairs Commission" },
  { label: "CAC Company Registration", url: "https://www.cac.gov.ng/services/company-registration", owner: "Corporate Affairs Commission" },
  { label: "CAC Company Registration Portal", url: "https://icrp.cac.gov.ng/", owner: "Corporate Affairs Commission" },
  { label: "Remita", url: "https://www.remita.net/", owner: "Remita Payment Services Limited" },
  { label: "Remita Knowledge Base", url: "https://support.remita.net/portal/en/kb", owner: "Remita Payment Services Limited" },
];

export const servicePlaybooks: ServicePlaybook[] = [
  {
    code: "nysc-assistance",
    title: "NYSC Registration Assistance",
    summary: "Help prospective corps members prepare, navigate the official portal, scan/resize documents, print outputs and resolve ordinary registration issues without impersonating the applicant.",
    whatWeSell: [
      "Registration-readiness check",
      "Document scanning, resizing and passport-photo preparation",
      "Official portal navigation assistance",
      "Printing of registration/call-up related documents where available",
      "Case follow-up and customer reminders",
    ],
    intake: [
      "Functional email address controlled by the applicant",
      "Nigerian GSM number",
      "Correct matriculation/institution details for locally trained graduates",
      "Passport photograph that meets current NYSC specifications",
      "Applicant physically present for biometric capture",
    ],
    workflow: [
      "Check the current NYSC mobilization timetable and registration requirements before accepting the job.",
      "For locally trained graduates, confirm the applicant understands that access depends on the institution-submitted Senate/Academic Board list.",
      "Create the account using the applicant's own email and have the applicant keep the password.",
      "Prepare documents and allow the applicant to review all names, dates and institution details.",
      "The applicant personally completes biometric capture; NYSC explicitly prohibits proxy biometric registration.",
      "Record only the non-sensitive application/case reference required for follow-up.",
      "Print/deliver acknowledgement or other available output and move the Fintigen case to the appropriate status.",
    ],
    neverDo: [
      "Never capture biometrics for an absent applicant or register by proxy.",
      "Never keep the applicant's NYSC password in Fintigen notes.",
      "Never alter academic documents or invent institution/matriculation details.",
      "Never promise mobilization, posting, relocation or exemption approval.",
    ],
    closeCaseWhen: [
      "The requested registration/printing task is completed or the case is formally handed back to the customer for an authority-required action.",
      "The customer has received the relevant acknowledgement/output and any outstanding balance is recorded.",
    ],
    officialLinks: officialSources.filter((source) => source.owner === "National Youth Service Corps"),
  },
  {
    code: "nin-support",
    title: "NIN / NIMC Support",
    summary: "Provide information, document preparation, Remita payment guidance for paid NIMC services, centre-location support and printing assistance while protecting identity data.",
    whatWeSell: [
      "NIMC service guidance and requirements check",
      "Document preparation and scanning",
      "Remita/RRR payment assistance for applicable NIMC services",
      "NIN slip/re-issue guidance and printing assistance where permitted",
      "Enrolment-centre location and appointment guidance",
    ],
    intake: [
      "Identify the exact service: first enrolment, modification, re-issue or other NIMC service",
      "Collect only the supporting documents needed for the selected service",
      "Do not request the customer's full NIN in ordinary notes unless absolutely required for a specific official step",
      "Applicant must be available for physical/biometric verification where NIMC requires it",
    ],
    workflow: [
      "First NIN enrolment is free. Never quote a Fintigen fee as though it were a NIMC enrolment charge.",
      "Check the live NIMC Fees page before quoting any government fee. At the knowledge-base review date, NIMC listed ₦2,000 per ordinary updatable field and a separate higher fee for date-of-birth modification; fees can change.",
      "For a paid NIMC service, confirm the exact service, generate/pay the correct Remita invoice/RRR and give the payment evidence to the customer.",
      "The person whose NIN is being modified or verified must attend the required NIMC process personally; payment by another person does not replace identity verification.",
      "Record the RRR/payment reference only when needed for case tracking and avoid copying sensitive identity information into notes.",
    ],
    neverDo: [
      "Never charge customers for 'NIN enrolment' as though Fintigen issues NINs.",
      "Never claim to modify NIN records directly; NIMC controls the modification.",
      "Never reveal, post or unnecessarily retain a customer's NIN.",
      "Never promise same-day identity changes or bypass physical verification.",
    ],
    closeCaseWhen: [
      "The customer's documents/payment evidence are prepared and the customer has completed or is ready for the authority-controlled step.",
      "Any requested printable acknowledgement/slip has been safely delivered.",
    ],
    officialLinks: officialSources.filter((source) => source.owner === "National Identity Management Commission"),
  },
  {
    code: "cac-business-name",
    title: "CAC Business Name Registration",
    summary: "Guide entrepreneurs from name selection through the official CAC CRP workflow while charging a transparent professional/ICT assistance fee separate from CAC charges.",
    whatWeSell: [
      "Business-name readiness and availability support",
      "Customer information/document preparation",
      "CAC CRP account and form navigation assistance",
      "Upload, filing and query-resolution support",
      "Certificate/extract download and business document setup",
    ],
    intake: [
      "Two or more proposed names where practical",
      "Proprietor's correct personal details and identity documentation",
      "Business address and contact details",
      "Clear nature/description of business",
      "Email/phone controlled by the customer",
    ],
    workflow: [
      "Check name availability and proceed through the official CAC Company Registration Portal.",
      "Complete the pre-registration information and upload only the documents requested for the filing.",
      "Verify the current CAC filing/statutory fees on the official system before collecting government money.",
      "Review all spellings and business objects with the customer before final submission.",
      "Record the official application/reference and any CAC query in the Fintigen case.",
      "When approved, deliver the electronic certificate and certified extract/output supplied by CAC.",
    ],
    neverDo: [
      "Never advertise a guaranteed CAC approval or guaranteed business name.",
      "Never invent proprietor/director/shareholder information.",
      "Never mix your service charge with CAC statutory fees on the invoice.",
    ],
    closeCaseWhen: [
      "The filing is approved and official CAC output has been delivered, or the customer has formally chosen not to proceed after a documented query/rejection.",
    ],
    officialLinks: officialSources.filter((source) => source.owner === "Corporate Affairs Commission"),
  },
  {
    code: "cac-company",
    title: "CAC Company Incorporation",
    summary: "Support company incorporation through the official CAC process, with stronger checking because directors, shareholders, share capital and company structure create additional complexity.",
    whatWeSell: [
      "Incorporation-readiness consultation",
      "Document/data preparation",
      "CRP filing assistance",
      "Payment and query tracking",
      "Post-registration digital document organization",
    ],
    intake: [
      "Proposed company names",
      "Correct directors/shareholders/subscribers information",
      "Registered office address",
      "Business objects/activity description",
      "Share-capital/ownership instructions and required supporting documents",
    ],
    workflow: [
      "Confirm the appropriate company structure before filing; refer legal/accounting questions to a qualified professional where necessary.",
      "Use CAC's official CRP to reserve/register the name and submit the pre-registration information and supporting documents.",
      "Confirm current filing and statutory charges from CAC before payment.",
      "Review all director/shareholder/company details with the customer before final submission.",
      "Track queries and record the CAC application reference in Fintigen.",
      "Deliver approved electronic registration documents and offer optional business email/website setup as a separate ICT service.",
    ],
    neverDo: [
      "Never provide legal assurances outside your competence.",
      "Never create fake directors/shareholders or identity documents.",
      "Never promise incorporation within a fixed time when CAC controls approval.",
    ],
    closeCaseWhen: [
      "CAC has issued the requested registration output and the customer has received it, or a documented authority/customer decision ends the case.",
    ],
    officialLinks: officialSources.filter((source) => source.owner === "Corporate Affairs Commission"),
  },
  {
    code: "remita-support",
    title: "Remita / RRR Payment Support",
    summary: "Help customers generate the correct RRR, pay a government/MDA or registered biller and retrieve payment evidence without taking over confidential banking credentials.",
    whatWeSell: [
      "Correct payment-path guidance",
      "MDA/biller and service-purpose verification assistance",
      "RRR generation assistance",
      "Payment-channel guidance",
      "Receipt/invoice retrieval and printing",
    ],
    intake: [
      "Who the customer intends to pay",
      "Exact service/purpose stated by the beneficiary authority",
      "Payer name, phone and email",
      "Existing RRR if one has already been generated",
      "Amount only after the official service/purpose has been verified",
    ],
    workflow: [
      "Determine whether the payment is FGN/State TSA, a registered biller, or an existing e-invoice/RRR.",
      "Search/select the correct MDA/biller and exact service/purpose on Remita. If uncertain, confirm with the beneficiary authority before proceeding.",
      "Generate the RRR and let the customer review beneficiary, purpose, payer details and amount before payment.",
      "Customer completes card/USSD/bank/internet-banking authorization personally. Never request a card PIN or OTP.",
      "Save the RRR/reference in the Fintigen case and deliver the official payment receipt/invoice to the customer.",
    ],
    neverDo: [
      "Never guess an MDA, biller or service/purpose because the amount looks familiar.",
      "Never collect card PINs, OTPs or internet-banking passwords.",
      "Never treat an RRR as proof that payment succeeded; verify/retrieve the payment evidence.",
      "Never create a second RRR unnecessarily when a valid existing invoice can be paid or retrieved.",
    ],
    closeCaseWhen: [
      "The intended beneficiary/purpose has been verified, payment evidence is available and delivered, and the RRR is recorded for follow-up if needed.",
    ],
    officialLinks: officialSources.filter((source) => source.owner === "Remita Payment Services Limited"),
  },
];

export const BUSINESS_CASE_STATUSES = [
  "submitted",
  "documents_checked",
  "payment_pending",
  "processing",
  "provider_action",
  "approved",
  "domain_setup",
  "bank_payment_setup",
  "completed",
  "needs_client_action",
] as const;

export type BusinessCaseStatus = (typeof BUSINESS_CASE_STATUSES)[number];

export type BusinessService =
  | "cac_business_name"
  | "cac_company"
  | "remita"
  | "domain"
  | "business_account"
  | "international_account"
  | "global_scale";

export interface BusinessCase {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  businessName: string;
  service: BusinessService;
  status: BusinessCaseStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const businessServiceLabels: Record<BusinessService, string> = {
  cac_business_name: "CAC Business Name Registration",
  cac_company: "CAC Company Registration",
  remita: "Remita / Government Payment Assistance",
  domain: "Domain & Business Email Setup",
  business_account: "Nigerian Business Account Readiness",
  international_account: "International Account Readiness",
  global_scale: "Nigeria → Global Scale Support",
};

export const statusLabels: Record<BusinessCaseStatus, string> = {
  submitted: "Submitted",
  documents_checked: "Documents Checked",
  payment_pending: "Payment Pending",
  processing: "Processing",
  provider_action: "With Official Provider",
  approved: "Approved",
  domain_setup: "Domain Setup",
  bank_payment_setup: "Bank / Payment Setup",
  completed: "Completed",
  needs_client_action: "Needs Client Action",
};

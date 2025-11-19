export type DocType = 'TERMS_CONDITIONS';

export interface LegalDocument {
  id: string;
  docType: DocType; // ✅ camelCase
  title: string;
  content: string; // HTML string
  version: string;
  isActive: boolean; // ✅ camelCase (published status)
  publishedAt: string | null; // ✅ camelCase
  createdBy: string;
  createdAt: string; // ✅ camelCase
  updatedAt: string; // ✅ camelCase
}

export interface CreateLegalDocPayload {
  doc_type: DocType;
  title: string;
  content: string;
  version: string;
}

export interface UpdateLegalDocPayload {
  title?: string;
  content?: string;
  version?: string;
}

export interface LegalDocResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: LegalDocument[];
}

export interface SingleLegalDocResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: LegalDocument;
}

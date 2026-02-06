import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface PmSuryaGharApplication {
    id: bigint;
    passportPhoto: ExternalBlob;
    status: string;
    fullName: string;
    submittedBy: Principal;
    email: string;
    timestamp: bigint;
    aadhaarCard: ExternalBlob;
    phoneNumber: string;
    electricityBill: ExternalBlob;
    bankPassbook: ExternalBlob;
}
export interface GalleryItem {
    id: bigint;
    title: string;
    blob: ExternalBlob;
    description: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(blob: ExternalBlob, title: string, description: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getApplicationStatus(applicationId: bigint): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getGallery(): Promise<Array<GalleryItem>>;
    getPmSuryaGharApplicationById(applicationId: bigint): Promise<PmSuryaGharApplication>;
    getPmSuryaGharApplicationsFiltered(searchTerm: string, status: string): Promise<Array<PmSuryaGharApplication>>;
    getSitemapXml(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<{
        id: bigint;
        timestamp: bigint;
    }>;
    submitPmSuryaGharApplication(fullName: string, email: string, phoneNumber: string, aadhaarCard: ExternalBlob, bankPassbook: ExternalBlob, electricityBill: ExternalBlob, passportPhoto: ExternalBlob): Promise<{
        id: bigint;
        status: string;
    }>;
    updateApplicationStatus(applicationId: bigint, newStatus: string): Promise<void>;
}

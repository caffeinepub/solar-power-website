import { useState } from 'react';
import { useSubmitPmSuryaGharApplication } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob } from '../backend';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const [files, setFiles] = useState<{
    aadhaarCard: File | null;
    bankPassbook: File | null;
    electricityBill: File | null;
    passportPhoto: File | null;
  }>({
    aadhaarCard: null,
    bankPassbook: null,
    electricityBill: null,
    passportPhoto: null,
  });

  const [uploadProgress, setUploadProgress] = useState<{
    aadhaarCard: number;
    bankPassbook: number;
    electricityBill: number;
    passportPhoto: number;
  }>({
    aadhaarCard: 0,
    bankPassbook: 0,
    electricityBill: 0,
    passportPhoto: 0,
  });

  const submitApplication = useSubmitPmSuryaGharApplication();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({
        ...files,
        [fieldName]: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      toast.error('कृपया सभी फील्ड भरें');
      return;
    }

    if (!files.aadhaarCard || !files.bankPassbook || !files.electricityBill || !files.passportPhoto) {
      toast.error('कृपया सभी दस्तावेज़ अपलोड करें');
      return;
    }

    try {
      // Convert files to ExternalBlob with progress tracking
      const aadhaarBlob = ExternalBlob.fromBytes(new Uint8Array(await files.aadhaarCard.arrayBuffer())).withUploadProgress(
        (percentage) => setUploadProgress((prev) => ({ ...prev, aadhaarCard: percentage }))
      );
      const bankPassbookBlob = ExternalBlob.fromBytes(new Uint8Array(await files.bankPassbook.arrayBuffer())).withUploadProgress(
        (percentage) => setUploadProgress((prev) => ({ ...prev, bankPassbook: percentage }))
      );
      const electricityBillBlob = ExternalBlob.fromBytes(new Uint8Array(await files.electricityBill.arrayBuffer())).withUploadProgress(
        (percentage) => setUploadProgress((prev) => ({ ...prev, electricityBill: percentage }))
      );
      const passportPhotoBlob = ExternalBlob.fromBytes(new Uint8Array(await files.passportPhoto.arrayBuffer())).withUploadProgress(
        (percentage) => setUploadProgress((prev) => ({ ...prev, passportPhoto: percentage }))
      );

      await submitApplication.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        aadhaarCard: aadhaarBlob,
        bankPassbook: bankPassbookBlob,
        electricityBill: electricityBillBlob,
        passportPhoto: passportPhotoBlob,
      });

      toast.success('आवेदन सफलतापूर्वक जमा किया गया!');
      
      // Reset form
      setFormData({ fullName: '', email: '', phoneNumber: '' });
      setFiles({
        aadhaarCard: null,
        bankPassbook: null,
        electricityBill: null,
        passportPhoto: null,
      });
      setUploadProgress({
        aadhaarCard: 0,
        bankPassbook: 0,
        electricityBill: 0,
        passportPhoto: 0,
      });
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error('आवेदन जमा करने में त्रुटि हुई');
    }
  };

  const isUploading = Object.values(uploadProgress).some((progress) => progress > 0 && progress < 100);

  return (
    <section id="application-form" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <Card className="glass-effect border-2 border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-primary" />
              <CardTitle className="text-3xl font-bold">
                🔒 Secure Upload | श्री सांवरिया Solar Power
              </CardTitle>
            </div>
            <CardDescription className="text-lg">
              PM Surya Ghar Yojana आवेदन फॉर्म
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">पूरा नाम *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email ID *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">मोबाइल नंबर *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-lg">आवश्यक दस्तावेज़</h3>

                {/* Aadhaar Card */}
                <div>
                  <Label htmlFor="aadhaarCard">Aadhaar Card (PDF) *</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      id="aadhaarCard"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'aadhaarCard')}
                      required
                      className="flex-1"
                    />
                    {files.aadhaarCard && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                  {uploadProgress.aadhaarCard > 0 && uploadProgress.aadhaarCard < 100 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      अपलोड हो रहा है: {uploadProgress.aadhaarCard}%
                    </div>
                  )}
                </div>

                {/* Bank Passbook */}
                <div>
                  <Label htmlFor="bankPassbook">Bank Passbook (PDF) *</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      id="bankPassbook"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'bankPassbook')}
                      required
                      className="flex-1"
                    />
                    {files.bankPassbook && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                  {uploadProgress.bankPassbook > 0 && uploadProgress.bankPassbook < 100 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      अपलोड हो रहा है: {uploadProgress.bankPassbook}%
                    </div>
                  )}
                </div>

                {/* Electricity Bill */}
                <div>
                  <Label htmlFor="electricityBill">Electricity Bill (PDF) *</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      id="electricityBill"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'electricityBill')}
                      required
                      className="flex-1"
                    />
                    {files.electricityBill && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                  {uploadProgress.electricityBill > 0 && uploadProgress.electricityBill < 100 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      अपलोड हो रहा है: {uploadProgress.electricityBill}%
                    </div>
                  )}
                </div>

                {/* Passport Photo */}
                <div>
                  <Label htmlFor="passportPhoto">Passport Size Photo (JPG/PNG) *</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      id="passportPhoto"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'passportPhoto')}
                      required
                      className="flex-1"
                    />
                    {files.passportPhoto && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </div>
                  {uploadProgress.passportPhoto > 0 && uploadProgress.passportPhoto < 100 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      अपलोड हो रहा है: {uploadProgress.passportPhoto}%
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[oklch(var(--solar-green))] to-[oklch(var(--solar-blue))] hover:from-[oklch(var(--solar-green)/0.9)] hover:to-[oklch(var(--solar-blue)/0.9)] text-white font-semibold py-6 text-lg"
                disabled={submitApplication.isPending || isUploading}
              >
                {submitApplication.isPending || isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    जमा हो रहा है...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    आवेदन जमा करें
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

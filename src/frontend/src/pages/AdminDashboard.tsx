import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetPmSuryaGharApplications, useIsCallerAdmin, useAssignAdminRole } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Search, LogOut, Loader2, FileText, Image as ImageIcon, Shield, AlertCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { identity, clear, loginStatus, login, loginError } = useInternetIdentity();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortColumn, setSortColumn] = useState<'timestamp' | 'fullName' | 'id'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const isAuthenticated = !!identity;
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: applications, isLoading: applicationsLoading } = useGetPmSuryaGharApplications(
    searchTerm,
    statusFilter
  );
  const assignAdminMutation = useAssignAdminRole();

  const handleLogout = async () => {
    await clear();
    navigate({ to: '/' });
  };

  const handleInternetIdentityLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleGrantAdminAccess = async () => {
    if (!identity) return;
    
    try {
      const principal = identity.getPrincipal();
      await assignAdminMutation.mutateAsync(principal);
    } catch (error) {
      console.error('Error granting admin access:', error);
    }
  };

  const handleSort = (column: 'timestamp' | 'fullName' | 'id') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedApplications = useMemo(() => {
    if (!applications) return [];
    
    const sorted = [...applications].sort((a, b) => {
      let comparison = 0;
      
      if (sortColumn === 'timestamp') {
        comparison = Number(a.timestamp - b.timestamp);
      } else if (sortColumn === 'fullName') {
        comparison = a.fullName.localeCompare(b.fullName);
      } else if (sortColumn === 'id') {
        comparison = Number(a.id - b.id);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [applications, sortColumn, sortDirection]);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('hi-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = async (blob: any, filename: string) => {
    try {
      const url = blob.getDirectURL();
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">एडमिन लॉगिन</CardTitle>
            <CardDescription className="text-center">
              कृपया एडमिन डैशबोर्ड एक्सेस करने के लिए लॉगिन करें
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                Internet Identity से लॉगिन करें। यह सबसे सुरक्षित तरीका है।
              </AlertDescription>
            </Alert>

            {loginError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Error</AlertTitle>
                <AlertDescription>
                  {loginError.message || 'An error occurred during login. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleInternetIdentityLogin} 
              className="w-full"
              disabled={loginStatus === 'logging-in'}
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  लॉगिन हो रहा है...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Internet Identity से लॉगिन करें
                </>
              )}
            </Button>

            {loginError && (
              <Button 
                onClick={handleInternetIdentityLogin} 
                variant="outline"
                className="w-full"
                disabled={loginStatus === 'logging-in'}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Login
              </Button>
            )}

            <Button onClick={() => navigate({ to: '/' })} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              होम पर वापस जाएं
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state while checking admin status
  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">एडमिन स्टेटस जांच रहे हैं...</p>
        </div>
      </div>
    );
  }

  // Show access denied with option to grant admin access
  if (!isAdmin && identity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">एडमिन एक्सेस की आवश्यकता है</CardTitle>
            <CardDescription className="text-center">
              इस डैशबोर्ड को एक्सेस करने के लिए एडमिन अधिकार चाहिए
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                आप लॉग इन हैं लेकिन आपके पास एडमिन अधिकार नहीं हैं। यदि आप इस एप्लिकेशन के मालिक हैं, तो नीचे दिए गए बटन से खुद को एडमिन एक्सेस दे सकते हैं।
              </AlertDescription>
            </Alert>
            
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">आपका Principal ID:</p>
              <p className="text-xs font-mono break-all text-muted-foreground">
                {identity?.getPrincipal().toString()}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleGrantAdminAccess} 
                className="w-full"
                disabled={assignAdminMutation.isPending}
              >
                {assignAdminMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    एडमिन एक्सेस दे रहे हैं...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    खुद को एडमिन एक्सेस दें
                  </>
                )}
              </Button>
              
              {assignAdminMutation.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    एडमिन एक्सेस देने में त्रुटि हुई। कृपया पुनः प्रयास करें।
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex gap-2">
                <Button onClick={() => navigate({ to: '/' })} variant="outline" className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  होम पर वापस जाएं
                </Button>
                <Button onClick={handleLogout} variant="destructive" className="flex-1">
                  <LogOut className="w-4 h-4 mr-2" />
                  लॉगआउट
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/1000020605.png"
                alt="श्री सांवरिया Solar Power Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gradient">एडमिन डैशबोर्ड</span>
                <span className="text-xs text-muted-foreground">श्री सांवरिया Solar Power</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate({ to: '/' })} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                होम
              </Button>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                लॉगआउट
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">ग्राहक आवेदन विवरण</CardTitle>
            <CardDescription>PM सूर्य घर योजना के सभी आवेदन देखें और प्रबंधित करें</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="नाम या फोन नंबर से खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="स्थिति फ़िल्टर करें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">सभी स्थिति</SelectItem>
                  <SelectItem value="pending">लंबित</SelectItem>
                  <SelectItem value="approved">स्वीकृत</SelectItem>
                  <SelectItem value="rejected">अस्वीकृत</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Applications Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                कुल आवेदन: <span className="font-semibold text-foreground">{sortedApplications?.length || 0}</span>
              </p>
            </div>

            {/* Table */}
            {applicationsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : sortedApplications && sortedApplications.length > 0 ? (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => handleSort('id')}
                      >
                        आवेदन ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => handleSort('fullName')}
                      >
                        पूरा नाम {sortColumn === 'fullName' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead>मोबाइल नंबर</TableHead>
                      <TableHead>Email ID</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => handleSort('timestamp')}
                      >
                        जमा करने का समय {sortColumn === 'timestamp' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead>स्थिति</TableHead>
                      <TableHead>दस्तावेज़</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedApplications.map((app) => (
                      <TableRow key={app.id.toString()}>
                        <TableCell className="font-medium">#{app.id.toString()}</TableCell>
                        <TableCell>{app.fullName}</TableCell>
                        <TableCell>{app.phoneNumber}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{app.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(app.timestamp)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              app.status === 'pending'
                                ? 'secondary'
                                : app.status === 'approved'
                                ? 'default'
                                : 'destructive'
                            }
                          >
                            {app.status === 'pending' ? 'लंबित' : app.status === 'approved' ? 'स्वीकृत' : 'अस्वीकृत'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(app.aadhaarCard, `aadhaar-${app.id}.pdf`)}
                              title="आधार कार्ड डाउनलोड करें"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              आधार
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(app.bankPassbook, `bank-${app.id}.pdf`)}
                              title="बैंक पासबुक डाउनलोड करें"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              बैंक
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(app.electricityBill, `bill-${app.id}.pdf`)}
                              title="बिजली बिल डाउनलोड करें"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              बिल
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(app.passportPhoto, `photo-${app.id}.jpg`)}
                              title="पासपोर्ट फोटो डाउनलोड करें"
                            >
                              <ImageIcon className="w-3 h-3 mr-1" />
                              फोटो
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">कोई आवेदन नहीं मिला</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

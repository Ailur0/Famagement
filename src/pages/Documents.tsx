import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getDocuments, saveDocuments } from '@/lib/storage';
import { getCurrentUser } from '@/lib/auth';
import { Document } from '@/types';
import { Plus, FileText, Shield, GraduationCap, CreditCard, File } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Document['type'] | 'all'>('all');
  const user = getCurrentUser();

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    type: 'other' as Document['type'],
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      toast({
        title: 'Error',
        description: 'Please select a file',
        variant: 'destructive',
      });
      return;
    }

    // Convert file to base64 for demo storage
    const reader = new FileReader();
    reader.onload = () => {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: formData.name || formData.file!.name,
        type: formData.type,
        uploadedBy: user?.name || '',
        uploadedAt: new Date().toISOString(),
        fileData: reader.result as string,
      };

      const updatedDocuments = [...documents, newDocument];
      setDocuments(updatedDocuments);
      saveDocuments(updatedDocuments);
      
      toast({
        title: 'Document uploaded',
        description: `${newDocument.name} has been saved`,
      });

      setOpen(false);
      setFormData({
        name: '',
        type: 'other',
        file: null,
      });
    };
    reader.readAsDataURL(formData.file);
  };

  const filteredDocuments = filter === 'all' 
    ? documents 
    : documents.filter(d => d.type === filter);

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'medical': return <Shield className="h-5 w-5 text-destructive" />;
      case 'insurance': return <CreditCard className="h-5 w-5 text-accent" />;
      case 'school': return <GraduationCap className="h-5 w-5 text-primary" />;
      case 'identification': return <FileText className="h-5 w-5 text-secondary" />;
      default: return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Document Vault</h2>
          <p className="text-muted-foreground">Securely store family documents</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Add a document to your family vault</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Health Insurance Card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Document Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: Document['type']) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="identification">Identification</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Upload Document</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'medical' ? 'default' : 'outline'}
          onClick={() => setFilter('medical')}
        >
          Medical
        </Button>
        <Button
          variant={filter === 'insurance' ? 'default' : 'outline'}
          onClick={() => setFilter('insurance')}
        >
          Insurance
        </Button>
        <Button
          variant={filter === 'school' ? 'default' : 'outline'}
          onClick={() => setFilter('school')}
        >
          School
        </Button>
        <Button
          variant={filter === 'identification' ? 'default' : 'outline'}
          onClick={() => setFilter('identification')}
        >
          Identification
        </Button>
        <Button
          variant={filter === 'other' ? 'default' : 'outline'}
          onClick={() => setFilter('other')}
        >
          Other
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  {getTypeIcon(doc.type)}
                  <span className="text-xs px-2 py-1 rounded bg-muted">
                    {doc.type}
                  </span>
                </div>
                <CardTitle className="text-lg mt-2">{doc.name}</CardTitle>
                <CardDescription>
                  Uploaded by {doc.uploadedBy}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No documents found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

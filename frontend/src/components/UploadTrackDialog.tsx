import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Music } from 'lucide-react';
import { useUploadTrack } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

const GENRES = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B', 'Indie', 'Other'];

export default function UploadTrackDialog() {
  const { identity, login } = useInternetIdentity();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('9.99');
  const [genre, setGenre] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadTrack = useUploadTrack();
  const isAuthenticated = !!identity;

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isAuthenticated) {
      toast.error('Please login to upload tracks');
      login();
      return;
    }
    setOpen(newOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload an MP3 or WAV file');
        return;
      }
      setAudioFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !genre || !audioFile) {
      toast.error('Please fill in all fields and select an audio file');
      return;
    }

    const priceInCents = Math.round(parseFloat(price) * 100);
    if (isNaN(priceInCents) || priceInCents <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      const arrayBuffer = await audioFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await uploadTrack.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        price: BigInt(priceInCents),
        genre,
        audioBlob: blob,
      });

      toast.success('Track uploaded successfully!');
      setOpen(false);
      resetForm();
    } catch (error: any) {
      if (error.message?.includes('Unauthorized')) {
        toast.error('Please login to upload tracks');
        login();
      } else {
        toast.error('Failed to upload track');
      }
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('9.99');
    setGenre('');
    setAudioFile(null);
    setUploadProgress(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gradient-music">
          <Upload className="mr-2 h-4 w-4" />
          Upload Track
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload New Track</DialogTitle>
          <DialogDescription>Share your music with the world. Fill in the details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Track Title *</Label>
            <Input
              id="title"
              placeholder="Enter track title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your track..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="9.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio">Audio File (MP3 or WAV) *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="audio"
                type="file"
                accept="audio/mpeg,audio/wav,audio/mp3"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            {audioFile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Music className="h-4 w-4" />
                <span>{audioFile.name}</span>
              </div>
            )}
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} />
              <p className="text-xs text-muted-foreground text-center">{uploadProgress}%</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={uploadTrack.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={uploadTrack.isPending} className="gradient-music">
            {uploadTrack.isPending ? 'Uploading...' : 'Upload Track'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

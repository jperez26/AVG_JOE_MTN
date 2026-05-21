import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { galleryAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';

const ManageGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    src: '',
    summit: '',
    caption: ''
  });

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const data = await galleryAPI.getAll();
      setPhotos(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load gallery photos', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPhoto) {
        await galleryAPI.update(editingPhoto.id, formData);
        toast({ title: 'Success', description: 'Photo updated successfully' });
      } else {
        await galleryAPI.create(formData);
        toast({ title: 'Success', description: 'Photo added successfully' });
      }
      
      loadPhotos();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save photo', variant: 'destructive' });
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      src: photo.src,
      summit: photo.summit,
      caption: photo.caption
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    
    try {
      await galleryAPI.delete(id);
      toast({ title: 'Success', description: 'Photo deleted successfully' });
      loadPhotos();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete photo', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setEditingPhoto(null);
    setFormData({
      src: '',
      summit: '',
      caption: ''
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className='min-h-screen bg-stone-100 dark:bg-stone-900'>
      <header className='bg-[#2C5530] border-b border-[#1a331c]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
              <Link to='/admin/dashboard'>
                <Button variant='ghost' size='icon' className='text-stone-300 hover:text-white'>
                  <ArrowLeft className='w-5 h-5' />
                </Button>
              </Link>
              <h1 className='text-2xl font-bold text-white' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Manage Gallery
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog} className='bg-amber-700 hover:bg-amber-800 text-white'>
                  <Plus className='w-4 h-4 mr-2' />
                  Add Photo
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl bg-stone-800 border-stone-700 text-white'>
                <DialogHeader>
                  <DialogTitle className='text-white'>
                    {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <Label className='text-stone-300'>Image URL</Label>
                    <Input
                      value={formData.src}
                      onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                      className='bg-stone-700 border-stone-600 text-white'
                      required
                    />
                  </div>

                  <div>
                    <Label className='text-stone-300'>Summit/Location</Label>
                    <Input
                      value={formData.summit}
                      onChange={(e) => setFormData({ ...formData, summit: e.target.value })}
                      className='bg-stone-700 border-stone-600 text-white'
                      required
                    />
                  </div>

                  <div>
                    <Label className='text-stone-300'>Caption</Label>
                    <Input
                      value={formData.caption}
                      onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                      className='bg-stone-700 border-stone-600 text-white'
                      required
                    />
                  </div>

                  <div className='flex justify-end gap-2'>
                    <Button type='button' variant='outline' onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type='submit' className='bg-amber-700 hover:bg-amber-800 text-white'>
                      {editingPhoto ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {loading ? (
          <div className='text-white text-center'>Loading...</div>
        ) : (
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {photos.map((photo) => (
              <Card key={photo.id} className='bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 overflow-hidden'>
                <div className='relative h-48 overflow-hidden'>
                  <img src={photo.src} alt={photo.caption} className='w-full h-full object-cover' />
                </div>
                <CardContent className='p-3'>
                  <p className='text-sm font-semibold mb-1'>{photo.summit}</p>
                  <p className='text-xs text-stone-600 dark:text-stone-400 mb-3'>{photo.caption}</p>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      onClick={() => handleEdit(photo)}
                      className='flex-1 bg-stone-700 hover:bg-stone-600 text-xs'
                    >
                      <Pencil className='w-3 h-3 mr-1' />
                      Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleDelete(photo.id)}
                    >
                      <Trash2 className='w-3 h-3' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageGallery;

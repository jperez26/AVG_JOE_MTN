import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { gearAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';

const ManageGear = () => {
  const [gearReviews, setGearReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGear, setEditingGear] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    rating: '',
    review: '',
    price: '',
    image: '',
    pros: [''],
    cons: ['']
  });

  useEffect(() => {
    loadGear();
  }, []);

  const loadGear = async () => {
    try {
      const data = await gearAPI.getAll();
      setGearReviews(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load gear reviews', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      rating: parseInt(formData.rating),
      price: parseFloat(formData.price),
      pros: formData.pros.filter(p => p.trim() !== ''),
      cons: formData.cons.filter(c => c.trim() !== '')
    };

    try {
      if (editingGear) {
        await gearAPI.update(editingGear.id, submitData);
        toast({ title: 'Success', description: 'Gear review updated successfully' });
      } else {
        await gearAPI.create(submitData);
        toast({ title: 'Success', description: 'Gear review created successfully' });
      }
      
      loadGear();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save gear review', variant: 'destructive' });
    }
  };

  const handleEdit = (gear) => {
    setEditingGear(gear);
    setFormData({
      name: gear.name,
      category: gear.category,
      rating: gear.rating.toString(),
      review: gear.review,
      price: gear.price.toString(),
      image: gear.image,
      pros: gear.pros.length > 0 ? gear.pros : [''],
      cons: gear.cons.length > 0 ? gear.cons : ['']
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gear review?')) return;
    
    try {
      await gearAPI.delete(id);
      toast({ title: 'Success', description: 'Gear review deleted successfully' });
      loadGear();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete gear review', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setEditingGear(null);
    setFormData({
      name: '',
      category: '',
      rating: '',
      review: '',
      price: '',
      image: '',
      pros: [''],
      cons: ['']
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const updateProsCons = (type, index, value) => {
    const newArray = [...formData[type]];
    newArray[index] = value;
    setFormData({ ...formData, [type]: newArray });
  };

  const addProsCons = (type) => {
    setFormData({ ...formData, [type]: [...formData[type], ''] });
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
                Manage Gear Reviews
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog} className='bg-amber-700 hover:bg-amber-800 text-white'>
                  <Plus className='w-4 h-4 mr-2' />
                  Add Gear Review
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-800 border-stone-700 text-white'>
                <DialogHeader>
                  <DialogTitle className='text-white'>
                    {editingGear ? 'Edit Gear Review' : 'Add New Gear Review'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label className='text-stone-300'>Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className='bg-stone-700 border-stone-600 text-white'
                        required
                      />
                    </div>
                    <div>
                      <Label className='text-stone-300'>Category</Label>
                      <Input
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className='bg-stone-700 border-stone-600 text-white'
                        required
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label className='text-stone-300'>Rating (1-10)</Label>
                      <Input
                        type='number'
                        min='1'
                        max='10'
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className='bg-stone-700 border-stone-600 text-white'
                        required
                      />
                    </div>
                    <div>
                      <Label className='text-stone-300'>Price ($)</Label>
                      <Input
                        type='number'
                        step='0.01'
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className='bg-stone-700 border-stone-600 text-white'
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className='text-stone-300'>Image URL</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className='bg-stone-700 border-stone-600 text-white'
                      required
                    />
                  </div>

                  <div>
                    <Label className='text-stone-300'>Review</Label>
                    <Textarea
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      className='bg-stone-700 border-stone-600 text-white'
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label className='text-stone-300'>Pros</Label>
                    {formData.pros.map((pro, index) => (
                      <Input
                        key={index}
                        value={pro}
                        onChange={(e) => updateProsCons('pros', index, e.target.value)}
                        className='bg-stone-700 border-stone-600 text-white mb-2'
                        placeholder='Add a pro'
                      />
                    ))}
                    <Button type='button' onClick={() => addProsCons('pros')} variant='outline' size='sm'>
                      Add Pro
                    </Button>
                  </div>

                  <div>
                    <Label className='text-stone-300'>Cons</Label>
                    {formData.cons.map((con, index) => (
                      <Input
                        key={index}
                        value={con}
                        onChange={(e) => updateProsCons('cons', index, e.target.value)}
                        className='bg-stone-700 border-stone-600 text-white mb-2'
                        placeholder='Add a con'
                      />
                    ))}
                    <Button type='button' onClick={() => addProsCons('cons')} variant='outline' size='sm'>
                      Add Con
                    </Button>
                  </div>

                  <div className='flex justify-end gap-2'>
                    <Button type='button' variant='outline' onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type='submit' className='bg-amber-700 hover:bg-amber-800 text-white'>
                      {editingGear ? 'Update' : 'Create'}
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
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {gearReviews.map((gear) => (
              <Card key={gear.id} className='bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700'>
                <div className='relative h-48 overflow-hidden'>
                  <img src={gear.image} alt={gear.name} className='w-full h-full object-cover' />
                  <div className='absolute top-2 right-2'>
                    <span className='px-2 py-1 bg-amber-700 text-white text-xs rounded'>
                      {gear.rating}/10
                    </span>
                  </div>
                </div>
                <CardContent className='p-4'>
                  <h3 className='text-xl font-bold mb-2'>{gear.name}</h3>
                  <p className='text-sm text-stone-600 dark:text-stone-400 mb-4'>
                    {gear.category} • ${gear.price}
                  </p>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      onClick={() => handleEdit(gear)}
                      className='flex-1 bg-stone-700 hover:bg-stone-600'
                    >
                      <Pencil className='w-4 h-4 mr-1' />
                      Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleDelete(gear.id)}
                    >
                      <Trash2 className='w-4 h-4' />
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

export default ManageGear;

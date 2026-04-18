import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { summitsAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';

const ManageSummits = () => {
  const [summits, setSummits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSummit, setEditingSummit] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    elevation: '',
    location: '',
    difficulty: '',
    type: 'past',
    date: '',
    story: '',
    description: '',
    image: '',
    coords: ['', ''],
    photos: ['']
  });

  useEffect(() => {
    loadSummits();
  }, []);

  const loadSummits = async () => {
    try {
      const data = await summitsAPI.getAll();
      setSummits(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load summits', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      elevation: parseInt(formData.elevation),
      coords: formData.coords.map(c => parseFloat(c)),
      photos: formData.photos.filter(p => p.trim() !== '')
    };

    try {
      if (editingSummit) {
        await summitsAPI.update(editingSummit.id, submitData);
        toast({ title: 'Success', description: 'Summit updated successfully' });
      } else {
        await summitsAPI.create(submitData);
        toast({ title: 'Success', description: 'Summit created successfully' });
      }
      
      loadSummits();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save summit', variant: 'destructive' });
    }
  };

  const handleEdit = (summit) => {
    setEditingSummit(summit);
    setFormData({
      name: summit.name,
      elevation: summit.elevation.toString(),
      location: summit.location,
      difficulty: summit.difficulty,
      type: summit.type,
      date: summit.date || '',
      story: summit.story || '',
      description: summit.description || '',
      image: summit.image,
      coords: summit.coords.map(c => c.toString()),
      photos: summit.photos.length > 0 ? summit.photos : ['']
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this summit?')) return;
    
    try {
      await summitsAPI.delete(id);
      toast({ title: 'Success', description: 'Summit deleted successfully' });
      loadSummits();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete summit', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setEditingSummit(null);
    setFormData({
      name: '',
      elevation: '',
      location: '',
      difficulty: '',
      type: 'past',
      date: '',
      story: '',
      description: '',
      image: '',
      coords: ['', ''],
      photos: ['']
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Header */}
      <header className="bg-stone-800 border-b border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="icon" className="text-stone-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Manage Summits
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog} className="bg-amber-800 hover:bg-amber-900 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Summit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-800 border-stone-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingSummit ? 'Edit Summit' : 'Add New Summit'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-stone-300">Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-stone-700 border-stone-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-stone-300">Elevation (ft)</Label>
                      <Input
                        type="number"
                        value={formData.elevation}
                        onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                        className="bg-stone-700 border-stone-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-stone-300">Location</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="bg-stone-700 border-stone-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-stone-300">Difficulty</Label>
                      <Input
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                        className="bg-stone-700 border-stone-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-stone-300">Type</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger className="bg-stone-700 border-stone-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="past">Past</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="dream">Dream</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-stone-300">Date</Label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-stone-700 border-stone-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-stone-300">Image URL</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="bg-stone-700 border-stone-600 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-stone-300">Latitude</Label>
                      <Input
                        type="number"
                        step="any"
                        value={formData.coords[0]}
                        onChange={(e) => setFormData({ ...formData, coords: [e.target.value, formData.coords[1]] })}
                        className="bg-stone-700 border-stone-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-stone-300">Longitude</Label>
                      <Input
                        type="number"
                        step="any"
                        value={formData.coords[1]}
                        onChange={(e) => setFormData({ ...formData, coords: [formData.coords[0], e.target.value] })}
                        className="bg-stone-700 border-stone-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  {formData.type === 'past' && (
                    <div>
                      <Label className="text-stone-300">Story</Label>
                      <Textarea
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                        className="bg-stone-700 border-stone-600 text-white"
                        rows={4}
                      />
                    </div>
                  )}

                  {(formData.type === 'planned' || formData.type === 'dream') && (
                    <div>
                      <Label className="text-stone-300">Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-stone-700 border-stone-600 text-white"
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-amber-800 hover:bg-amber-900 text-white">
                      {editingSummit ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summits.map((summit) => (
              <Card key={summit.id} className="bg-stone-800 border-stone-700">
                <div className="relative h-48 overflow-hidden">
                  <img src={summit.image} alt={summit.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-amber-800 text-white text-xs rounded">
                      {summit.type}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{summit.name}</h3>
                  <p className="text-stone-400 text-sm mb-4">
                    {summit.location} • {summit.elevation.toLocaleString()} ft
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(summit)}
                      className="flex-1 bg-stone-700 hover:bg-stone-600"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(summit.id)}
                    >
                      <Trash2 className="w-4 h-4" />
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

export default ManageSummits;

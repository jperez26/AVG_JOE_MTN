import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const mailtoLink = `mailto:contact@averagejoeclimbing.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    toast({
      title: 'Opening your email client...',
      description: 'Your message will be sent from your default email app.',
    });

    // Reset form
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl md:text-6xl font-bold text-stone-900 dark:text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Get In Touch
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400">
            Questions about gear, routes, or mountaineering? Let's connect!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700">
            <CardHeader>
              <CardTitle className="text-2xl text-stone-900 dark:text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-stone-700 dark:text-stone-300">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-stone-700 dark:text-stone-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-stone-700 dark:text-stone-300">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-stone-700 dark:text-stone-300">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-stone-50 dark:bg-stone-700 border-stone-300 dark:border-stone-600"
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-8 h-8 text-amber-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">Email</h3>
                    <a
                      href="mailto:contact@averagejoeclimbing.com"
                      className="text-amber-700 hover:text-amber-800"
                    >
                      contact@averagejoeclimbing.com
                    </a>
                    <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
                      I typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-amber-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">Location</h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      Pacific Northwest, USA
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
                      Always planning the next adventure
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-700 to-amber-800 border-amber-600">
              <CardContent className="p-6 text-white">
                <h3 className="font-bold text-xl mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Want to Connect?
                </h3>
                <p className="mb-4 text-amber-50">
                  Whether you're a fellow climber, have gear questions, or want to share your own mountaineering stories, I'd love to hear from you!
                </p>
                <ul className="space-y-2 text-sm text-amber-50">
                  <li>✓ Gear recommendations and reviews</li>
                  <li>✓ Route planning and beta</li>
                  <li>✓ Training tips for beginners</li>
                  <li>✓ General mountaineering questions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

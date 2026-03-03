// @ts-nocheck
import React, { useState } from 'react';
import { useLanguageContext } from "@/lib/LanguageContext";
import { Calculator, MapPin, Package, Clock, Truck, Phone, Mail } from 'lucide-react';
import { IMAGES } from '@/assets/images';

export default function ShippingCalculator() {
  const { t } = useLanguageContext();
  const [formData, setFormData] = useState({
    origin: 'Yangon',
    destinationRegion: '',
    township: '',
    weight: '',
    length: '',
    width: '',
    height: ''
  });
  const [calculatedRate, setCalculatedRate] = useState<{
    price: string;
    time: string;
    note: string;
  } | null>(null);

  const yangonTownships = {
    central: [
      'Ahlone', 'Bahan', 'Botahtaung', 'Dagon', 'Dawbon', 'Hlaing',
      'Insein', 'Kamaryut', 'Kyauktada', 'Kyimyindaing', 'Lanmataw',
      'Latha', 'Mayangone', 'Mingalar Taung Nyunt', 'North Okkalapa',
      'Pabedan', 'Pazundaung', 'Sanchaung', 'South Oakkalapa', 'Tamwe',
      'Thaketa', 'Thingangyun', 'Yankin'
    ],
    extended: [
      'Dagon Seikken', 'East Dagon', 'Hlaing Thar Yar', 'Mingalar Don',
      'North Dagon', 'Shwe Paukkan', 'Shwe Pyi Thar', 'South Dagon'
    ],
    suburban: [
      'Htauk Kyant', 'Hlegu', 'Hmawbi', 'Lay Daung Kan', 'Thanlyin'
    ]
  };

  const calculateRate = () => {
    const weight = parseFloat(formData.weight) || 0;
    let baseRate = 0;
    let timeEstimate = '';
    let note = '';

    if (formData.destinationRegion === 'yangon') {
      if (yangonTownships.central.includes(formData.township)) {
        baseRate = 2000;
        timeEstimate = 'Same Day';
        note = 'Central Yangon - Premium Service';
      } else if (yangonTownships.extended.includes(formData.township)) {
        baseRate = 2500;
        timeEstimate = 'Same Day';
        note = 'Extended Yangon Areas';
      } else if (yangonTownships.suburban.includes(formData.township)) {
        baseRate = 3000;
        timeEstimate = 'Next Day';
        note = 'Suburban Areas';
      }
    } else if (formData.destinationRegion === 'mandalay') {
      baseRate = 4500;
      timeEstimate = 'Next Day';
      note = 'Mandalay Region Express';
    } else if (formData.destinationRegion === 'naypyitaw') {
      baseRate = 4000;
      timeEstimate = 'Next Day';
      note = 'Capital Express Service';
    } else {
      baseRate = 5500;
      timeEstimate = '2-3 Days';
      note = 'Other States/Regions';
    }

    // Additional weight charges
    if (weight > 1) {
      baseRate += (weight - 1) * 500;
    }

    setCalculatedRate({
      price: `${baseRate.toLocaleString()} MMK`,
      time: timeEstimate,
      note: `${note}. Base rate covers 1st Kg. Additional weight +500 MMK/Kg.`
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'destinationRegion' && value !== 'yangon') {
      setFormData(prev => ({ ...prev, township: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-gold-50">
      {/* Header */}
      <div className="header-gradient text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={IMAGES.BRITIUM_LOGO_55 || "/images/britium-logo.png"}
                alt="Britium Express" 
                className="w-10 h-10 rounded-lg bg-white/10 p-1"
              />
              <span className="nav-brand">Britium Express</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+95-9-897447744</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@britiumexpress.com</span>
              </div>
              <span>Mon-Sat: 9:00am - 5:30pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-navy-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="nav-link-gold font-semibold">Home</a>
              <a href="/track" className="nav-link-gold">Track & Trace</a>
              <a href="/services" className="nav-link-gold">Services</a>
              <a href="/quote" className="nav-link-gold active">Get Quote</a>
              <a href="/about" className="nav-link-gold">About Us</a>
              <a href="/news" className="nav-link-gold">News</a>
              <a href="/contact" className="nav-link-gold">Contact</a>
            </div>
            <a href="/login" className="btn-gold">Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-brand-navy via-brand-royal to-navy-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-amber/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Calculator className="w-12 h-12 text-brand-gold" />
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">
                Shipping Rate Calculator
              </h1>
            </div>
            <p className="text-xl text-navy-100 mb-8">
              Check our specific Yangon City rates below. / ရန်ကုန်မြို့တွင်း ပို့ဆောင်ခ နှုန်းထားများကို စစ်ဆေးပါ
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="surface-elevated p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-2">
                    📦 Shipment Details
                  </h2>
                  <p className="text-navy-600">Enter your package information to get an instant quote</p>
                </div>

                <div className="space-y-6">
                  {/* Origin */}
                  <div>
                    <label className="form-label-elegant flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      Origin / မူလနေရာ
                    </label>
                    <div className="form-elegant bg-navy-50 text-navy-600 cursor-not-allowed">
                      From: Yangon / မှ: ရန်ကုန်
                    </div>
                  </div>

                  {/* Destination Region */}
                  <div>
                    <label className="form-label-elegant">
                      Destination Region / ဦးတည်ရာ ဒေသ
                    </label>
                    <select
                      value={formData.destinationRegion}
                      onChange={(e) => handleInputChange('destinationRegion', e.target.value)}
                      className="form-elegant w-full"
                    >
                      <option value="">Select Region / ဒေသ ရွေးချယ်ရန်</option>
                      <option value="yangon">Yangon City / ရန်ကုန်မြို့</option>
                      <option value="mandalay">Mandalay Region / မန္တလေးတိုင်း</option>
                      <option value="naypyitaw">Nay Pyi Taw / နေပြည်တော်</option>
                      <option value="other">Other States/Regions / အခြား ပြည်နယ်/တိုင်းများ</option>
                    </select>
                  </div>

                  {/* Township Selection */}
                  {formData.destinationRegion === 'yangon' && (
                    <div>
                      <label className="form-label-elegant">
                        Select Township / မြို့နယ် ရွေးချယ်ရန်
                      </label>
                      <select
                        value={formData.township}
                        onChange={(e) => handleInputChange('township', e.target.value)}
                        className="form-elegant w-full"
                      >
                        <option value="">-- Select Area / ဧရိယာ ရွေးရန် --</option>
                        <optgroup label="Central Yangon / ရန်ကုန် မြို့လယ်">
                          {yangonTownships.central.map(township => (
                            <option key={township} value={township}>{township}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Extended Areas / တိုးချဲ့ ဧရိယာများ">
                          {yangonTownships.extended.map(township => (
                            <option key={township} value={township}>{township}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Suburban Areas / မြို့ပြင် ဧရိယာများ">
                          {yangonTownships.suburban.map(township => (
                            <option key={township} value={township}>{township}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  )}

                  {/* Weight */}
                  <div>
                    <label className="form-label-elegant flex items-center gap-2">
                      <Package className="w-4 h-4 text-brand-gold" />
                      Weight (Kg) / အလေးချိန် (ကီလိုဂရမ်)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="form-elegant w-full"
                      placeholder="Enter weight / အလေးချိန် ထည့်ရန်"
                    />
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="form-label-elegant">
                      Dimensions (L x W x H cm) - Optional / အရွယ်အစား (ရှည် x နံ x မြင့် စင်တီမီတာ) - ရွေးချယ်ရန်
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        value={formData.length}
                        onChange={(e) => handleInputChange('length', e.target.value)}
                        className="form-elegant"
                        placeholder="Length"
                      />
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => handleInputChange('width', e.target.value)}
                        className="form-elegant"
                        placeholder="Width"
                      />
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="form-elegant"
                        placeholder="Height"
                      />
                    </div>
                  </div>

                  <button
                    onClick={calculateRate}
                    disabled={!formData.destinationRegion || !formData.weight}
                    className="btn-gold w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate Rate / နှုန်းထား တွက်ချက်ရန်
                  </button>
                </div>
              </div>

              {/* Results Section */}
              <div className="surface-elevated p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-brand-navy mb-2">
                    💰 Estimated Delivery Cost
                  </h2>
                  <p className="text-navy-600">Your shipping quote will appear here</p>
                </div>

                {calculatedRate ? (
                  <div className="space-y-6">
                    <div className="surface-gold p-6 text-center">
                      <div className="text-4xl font-bold text-brand-navy mb-2">
                        {calculatedRate.price}
                      </div>
                      <div className="text-lg text-navy-700 mb-4">
                        Estimated Delivery Time: {calculatedRate.time}
                      </div>
                      <div className="text-sm text-navy-600 bg-white/50 p-3 rounded-lg">
                        {calculatedRate.note}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-navy-50 rounded-lg">
                        <span className="font-medium text-navy-700">Service Type</span>
                        <span className="font-bold text-brand-navy">Express Delivery</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gold-50 rounded-lg">
                        <span className="font-medium text-navy-700">Insurance</span>
                        <span className="font-bold text-brand-gold">Included</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-navy-50 rounded-lg">
                        <span className="font-medium text-navy-700">Tracking</span>
                        <span className="font-bold text-brand-navy">Real-time</span>
                      </div>
                    </div>

                    <button className="btn-primary w-full py-4 text-lg font-bold">
                      <Truck className="w-5 h-5 mr-2" />
                      BOOK NOW / ယခုပင် မှာယူရန်
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-12 h-12 text-navy-400" />
                    </div>
                    <p className="text-navy-500 text-lg">
                      Select a destination and enter weight to see pricing
                    </p>
                    <p className="text-navy-400 text-sm mt-2">
                      ဦးတည်ရာနေရာနှင့် အလေးချိန်ကို ရွေးချယ်ပြီး ဈေးနှုန်းကို ကြည့်ရှုပါ
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gradient-to-r from-navy-50 to-gold-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-brand-navy mb-4">
                Why Choose Britium Express?
              </h2>
              <p className="text-navy-600 text-lg">
                Premium logistics services with Myanmar's golden standard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-brand-amber rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Door-to-Door</h3>
                <p className="text-navy-600">
                  We pick up from your doorstep and deliver directly to the receiver. No need to visit a station.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-navy to-brand-royal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Secure Handling</h3>
                <p className="text-navy-600">
                  From documents to fragile parcels, our trained staff ensures your items arrive intact.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-info to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Real-Time Updates</h3>
                <p className="text-navy-600">
                  Track your shipment status via our Website or Mobile App at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-brand-navy via-navy-800 to-brand-royal text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold text-brand-gold mb-4">Britium Express</h3>
              <p className="text-navy-200 mb-4">
                A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, secure, and compliant logistics solutions.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-brand-gold mb-4">Links</h4>
              <div className="space-y-2">
                <a href="/track" className="block text-navy-200 hover:text-brand-gold transition-colors">Track Package</a>
                <a href="/services" className="block text-navy-200 hover:text-brand-gold transition-colors">Services</a>
                <a href="/quote" className="block text-navy-200 hover:text-brand-gold transition-colors">Get Quote</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-brand-gold mb-4">Reach Out</h4>
              <div className="space-y-2 text-navy-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Britium Ventures Company Limited, YANGON, Yangon 11451 My.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+95-9-897447744, +95-9-897447755</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-navy-700 mt-8 pt-8 text-center">
            <p className="text-navy-300">
              © 2026 Britium Ventures Company Limited. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
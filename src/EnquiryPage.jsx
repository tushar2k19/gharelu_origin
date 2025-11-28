import React, { useState, useRef } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowLeft, Mail, Phone, User, MessageSquare, ChevronRight, AlertCircle, CheckCircle, Leaf } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { COLORS } from './constants';

const EnquiryPage = ({ cart, removeFromCart, updateQuantity, clearCart, onBackToHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errors, setErrors] = useState({});
  const [showEmptyBagWarning, setShowEmptyBagWarning] = useState(false);

  const formRef = useRef(null);

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (cart.items.length === 0) {
      setShowEmptyBagWarning(true);
    } else {
      sendEnquiry();
    }
  };

  const sendEnquiry = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setShowEmptyBagWarning(false);

    try {
      // Build cart items HTML table
      let cartItemsHTML = '';
      let cartItemsMobileHTML = '';
      let totalAmount = 0;

      if (cart.items.length > 0) {
          totalAmount = getCartTotal();
          cartItemsHTML = cart.items.map((item) => {
            const itemTotal = item.variant.price * item.quantity;
            const siteUrl = window.location.origin.includes('localhost') 
              ? 'https://ghareluorigins.netlify.app'
              : window.location.origin;
            
            let imageUrl = item.productImage.startsWith('http') 
              ? item.productImage 
              : `${siteUrl}${item.productImage}`;
            
            if (!item.productImage.startsWith('http')) {
              const pathParts = item.productImage.split('/');
              const filename = pathParts.pop();
              const encodedFilename = encodeURIComponent(filename);
              imageUrl = `${siteUrl}${pathParts.join('/')}/${encodedFilename}`;
            }
            
            return `
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 8px; text-align: center; width: 80px; vertical-align: middle;">
                  <img src="${imageUrl}" alt="${item.productName}" width="80" height="80" style="width: 80px; height: 80px; max-width: 80px; border-radius: 8px; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" />
                </td>
                <td style="padding: 12px 8px; text-align: left;">
                  <strong style="color: #034225; font-size: 16px; line-height: 1.4; display: block; margin-bottom: 4px;">${item.productName}</strong>
                  <span style="color: #6b7280; font-size: 13px; line-height: 1.5; display: block; margin-bottom: 6px;">${item.productDesc}</span>
                  <span style="color: #6b7280; font-size: 11px; line-height: 1.4; display: block;">
                    <strong>Variant:</strong> ${item.variant.size} | 
                    <strong>Tea Garden:</strong> ${item.teaGarden || 'N/A'}
                  </span>
                </td>
                <td style="padding: 12px 8px; text-align: center; color: #034225; font-weight: bold; font-size: 15px; width: 50px;">
                  ${item.quantity}
                </td>
                <td style="padding: 12px 8px; text-align: center; color: #6b7280; font-size: 14px; width: 80px;">
                  ₹${item.variant.price}
                </td>
                <td style="padding: 12px 8px; text-align: right; color: #f9b000; font-weight: bold; font-size: 18px; width: 100px;">
                  ₹${itemTotal}
                </td>
              </tr>
            `;
          }).join('');

          cartItemsMobileHTML = cart.items.map((item) => {
             // ... similar logic for mobile cards ...
             // For brevity using simpler mobile structure for now, duplicating logic is fine
             const itemTotal = item.variant.price * item.quantity;
             const siteUrl = window.location.origin.includes('localhost') ? 'https://ghareluorigins.netlify.app' : window.location.origin;
             let imageUrl = item.productImage.startsWith('http') ? item.productImage : `${siteUrl}${item.productImage}`;
             if (!item.productImage.startsWith('http')) {
                const pathParts = item.productImage.split('/');
                const filename = pathParts.pop();
                const encodedFilename = encodeURIComponent(filename);
                imageUrl = `${siteUrl}${pathParts.join('/')}/${encodedFilename}`;
             }

             return `
               <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px; padding: 16px;">
                 <table style="width: 100%; border-collapse: collapse;">
                   <tr>
                     <td style="padding: 0; text-align: center; width: 100px; vertical-align: top;">
                       <img src="${imageUrl}" alt="${item.productName}" width="100" height="100" style="width: 100px; height: 100px; max-width: 100px; border-radius: 8px; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" />
                     </td>
                     <td style="padding: 0 0 0 12px; vertical-align: top;">
                       <strong style="color: #034225; font-size: 16px; line-height: 1.4; display: block; margin-bottom: 6px;">${item.productName}</strong>
                       <span style="color: #6b7280; font-size: 13px; line-height: 1.5; display: block; margin-bottom: 8px;">${item.productDesc}</span>
                       <span style="color: #6b7280; font-size: 11px; line-height: 1.4; display: block; margin-bottom: 12px;">
                         <strong>Variant:</strong> ${item.variant.size}<br/>
                         <strong>Tea Garden:</strong> ${item.teaGarden || 'N/A'}
                       </span>
                       <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
                         <tr>
                           <td style="padding: 4px 0; color: #6b7280; font-size: 13px;"><strong>Qty:</strong> ${item.quantity}</td>
                           <td style="padding: 4px 0; color: #6b7280; font-size: 13px; text-align: right;"><strong>Price:</strong> ₹${item.variant.price}</td>
                         </tr>
                         <tr>
                           <td colspan="2" style="padding: 8px 0 0 0; text-align: right;">
                             <span style="color: #f9b000; font-weight: bold; font-size: 20px;">Total: ₹${itemTotal}</span>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                 </table>
               </div>
             `;
          }).join('');
      }

      // Create HTML email template
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style type="text/css">
            /* ... styles from Cart.jsx ... */
            body { font-family: Georgia, serif; background-color: #f8f5e3; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #034225 0%, #025a2f 100%); padding: 30px; text-align: center; color: white; }
            .content { padding: 30px 20px; }
            .section-title { color: #034225; border-bottom: 2px solid #f9b000; padding-bottom: 10px; margin-bottom: 20px; }
            .info-row { margin-bottom: 10px; }
            .label { font-weight: bold; color: #6b7280; }
            .value { color: #034225; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0;">New Enquiry</h1>
              <p style="margin:5px 0 0;">Gharelu Origins</p>
            </div>
            <div class="content">
              <h2 class="section-title">Customer Details</h2>
              <div class="info-row"><span class="label">Name:</span> <span class="value">${formData.name}</span></div>
              <div class="info-row"><span class="label">Email:</span> <span class="value">${formData.email}</span></div>
              <div class="info-row"><span class="label">Phone:</span> <span class="value">${formData.phone}</span></div>
              ${formData.message ? `<div class="info-row"><span class="label">Message:</span> <br/><span class="value">${formData.message}</span></div>` : ''}
              
              ${cart.items.length > 0 ? `
                <h2 class="section-title" style="margin-top: 30px;">Bag Items (${cart.items.length})</h2>
                <table width="100%" style="border-collapse: collapse;">
                  ${cartItemsHTML}
                </table>
                <div style="text-align: right; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
                   <strong style="font-size: 18px; color: #034225;">Total: </strong>
                   <span style="font-size: 24px; color: #f9b000; font-weight: bold;">₹${totalAmount}</span>
                </div>
              ` : `
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
                  <p style="color: #6b7280; font-style: italic;">No products selected for this enquiry.</p>
                </div>
              `}
            </div>
            <div style="background-color: #034225; color: #f8f5e3; padding: 15px; text-align: center; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Gharelu Origins
            </div>
          </div>
        </body>
        </html>
      `;

      const templateParams = {
        to_email: 'tushar01.jha@gmail.com', // or configured email
        to_name: 'Gharelu Origins Team',
        from_name: formData.name,
        from_email: formData.email,
        subject: cart.items.length > 0 ? `New Order Enquiry from ${formData.name}` : `General Enquiry from ${formData.name}`,
        message_html: emailHTML,
        reply_to: formData.email,
      };

      const result = await emailjs.send(
        'service_bbnpyrh',
        'template_t6gf4mj',
        templateParams,
        'Y84evwBNKpU6z9dWf'
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        clearCart();
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#e8f5e9] to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-20 right-[-5%] w-64 h-64 opacity-10 pointer-events-none animate-pulse-slow">
        <Leaf size={256} color={COLORS.darkGreen} />
      </div>
      <div className="absolute bottom-20 left-[-5%] w-48 h-48 opacity-10 pointer-events-none rotate-45">
        <Leaf size={192} color={COLORS.goldenYellow} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4" style={{ color: COLORS.darkGreen }}>
              Enquiry & Bag
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Review your selected items or simply send us a message. We're here to help with your order.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Bag Items */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold flex items-center gap-2" style={{ color: COLORS.darkGreen }}>
                  <ShoppingBag size={24} />
                  Your Selection
                </h2>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-white shadow-sm text-gray-600 border border-gray-100">
                  {cart.items.length} {cart.items.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {cart.items.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-xl border border-gray-100 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-50" />
                   <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <ShoppingBag size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.darkGreen }}>Your bag is empty</h3>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't added any handcrafted goodness yet.</p>
                    <Link 
                      to="/all-products"
                      className="inline-flex items-center px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      style={{ backgroundColor: COLORS.darkGreen }}
                    >
                      Browse Collections
                      <ArrowLeft className="ml-2 rotate-180" size={18} />
                    </Link>
                   </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cart Items List */}
                  <AnimatePresence>
                    {cart.items.map((item, idx) => (
                      <motion.div
                        key={`${item.productId}-${item.variant.size}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />
                         
                         <div className="flex gap-4 md:gap-6 relative z-10">
                           {/* Image */}
                           <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                             <img
                               src={item.productImage}
                               alt={item.productName}
                               className="w-full h-full object-contain p-2 mix-blend-multiply"
                             />
                           </div>

                           {/* Content */}
                           <div className="flex-grow flex flex-col justify-between py-1">
                             <div className="flex justify-between items-start">
                               <div>
                                 <h3 className="text-lg md:text-xl font-serif font-bold leading-tight mb-1" style={{ color: COLORS.darkGreen }}>
                                   {item.productName}
                                 </h3>
                                 <p className="text-xs md:text-sm text-gray-500 font-medium mb-1">{item.variant.size}</p>
                                 {item.teaGarden && (
                                    <p className="text-[10px] md:text-xs text-green-700/70 font-semibold uppercase tracking-wide flex items-center gap-1">
                                      <Leaf size={10} />
                                      {item.teaGarden}
                                    </p>
                                 )}
                               </div>
                               <button
                                 onClick={() => removeFromCart(item.productId, item.variant.size)}
                                 className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                 aria-label="Remove item"
                               >
                                 <X size={20} />
                               </button>
                             </div>

                             <div className="flex items-end justify-between mt-3">
                               {/* Quantity Controls */}
                               <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                                 <button
                                   onClick={() => updateQuantity(item.productId, item.variant.size, item.quantity - 1)}
                                   className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-white shadow-sm"
                                   style={{ color: COLORS.darkGreen }}
                                 >
                                   <Minus size={14} />
                                 </button>
                                 <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                 <button
                                   onClick={() => updateQuantity(item.productId, item.variant.size, item.quantity + 1)}
                                   className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-white shadow-sm"
                                   style={{ color: COLORS.darkGreen }}
                                 >
                                   <Plus size={14} />
                                 </button>
                               </div>

                               {/* Price */}
                               <div className="text-right">
                                 <p className="text-xl md:text-2xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                                   ₹{item.variant.price * item.quantity}
                                 </p>
                                 <p className="text-[10px] md:text-xs text-gray-400">₹{item.variant.price} / unit</p>
                               </div>
                             </div>
                           </div>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Order Summary Section - Only visible if items exist */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-gray-100 mt-6" style={{ borderColor: COLORS.goldenYellow }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: COLORS.darkGreen }}>Estimated Total</h3>
                        <p className="text-xs text-gray-500">Shipping calculated at confirmation</p>
                      </div>
                      <span className="text-3xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                        ₹{getCartTotal()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                      <Link to="/all-products" className="text-sm font-semibold hover:underline flex items-center justify-center gap-1 text-gray-500 hover:text-green-800 transition-colors">
                          Add more items <ChevronRight size={14} />
                      </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-5 sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-800 via-green-600 to-yellow-400" />
              
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold mb-2" style={{ color: COLORS.darkGreen }}>Send Enquiry</h2>
                <p className="text-sm text-gray-500">
                   Have questions or ready to order? Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400 group-focus-within:text-green-700 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl border-2 transition-all outline-none ${
                      errors.name 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-transparent focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100'
                    }`}
                    placeholder="Full Name *"
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1 ml-2 block animate-pulse">{errors.name}</span>}
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400 group-focus-within:text-green-700 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl border-2 transition-all outline-none ${
                      errors.email
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-transparent focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100'
                    }`}
                    placeholder="Email Address *"
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1 ml-2 block animate-pulse">{errors.email}</span>}
                </div>

                {/* Phone Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400 group-focus-within:text-green-700 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl border-2 transition-all outline-none ${
                      errors.phone
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-transparent focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100'
                    }`}
                    placeholder="Phone Number *"
                  />
                  {errors.phone && <span className="text-xs text-red-500 mt-1 ml-2 block animate-pulse">{errors.phone}</span>}
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                    <MessageSquare size={18} className="text-gray-400 group-focus-within:text-green-700 transition-colors" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent transition-all outline-none focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 resize-none"
                    placeholder="Any special requests or questions? (Optional)"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-lg tracking-wide text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{ backgroundColor: COLORS.darkGreen }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3"
                    >
                      <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-green-800 font-bold text-sm">Enquiry Sent Successfully!</p>
                        <p className="text-green-700 text-xs mt-1">Thank you for reaching out. We will get back to you shortly.</p>
                      </div>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-red-800 font-bold text-sm">Submission Failed</p>
                        <p className="text-red-700 text-xs mt-1">Something went wrong. Please try again or contact us directly.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Empty Bag Warning Modal */}
      <AnimatePresence>
        {showEmptyBagWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowEmptyBagWarning(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative z-10 text-center"
            >
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2" style={{ color: COLORS.darkGreen }}>Send without products?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your bag is currently empty. Would you like to send this as a general enquiry instead?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEmptyBagWarning(false)}
                  className="flex-1 py-2.5 rounded-lg font-bold text-sm border-2 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendEnquiry}
                  className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white transition-colors shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: COLORS.darkGreen }}
                >
                  Yes, Send
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiryPage;


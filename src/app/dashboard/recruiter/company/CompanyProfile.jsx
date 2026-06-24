'use client';

import React, { useState, useRef } from 'react';
import {
  Form,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  TextArea,
  Button,
  Chip,
  Avatar,
} from '@heroui/react';
import {
  Building2,
  Globe,
  MapPin,
  Users,
  UploadCloud,
  Plus,
  Pencil,
} from 'lucide-react';
import { createCompany } from '@/lib/actions/company';

export default function CompanyProfile({ recruiter, recruitercompany }) {
  // 🌟 FIX 3: Start with null so it shows the empty state first
  const [companies, setCompanies] = useState(recruitercompany);
  // console.log(recruitercompany);
  // console.log(company[0]._id);
  const company = companies[0]
  // console.log(company);

  // UI Control states
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const fileInputRef = useRef(null);

  // Status Chip styling configuration mapping helper
  const statusConfig = {
    pending: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20',
    },
    approved: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
    },
    rejected: {
      bg: 'bg-danger/10',
      text: 'text-danger',
      border: 'border-danger/20',
    },
  };

  const currentStatus = statusConfig[company?.status || 'pending'];

  // Handle client-side ImgBB raw image asset uploading
  const handleLogoUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMAGE_API;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const result = await response.json();
      if (result.success) {
        // 🌟 FIX 1: Save the secure direct image link string to state instantly
        setLogoUrl(result.data.url);
      } else {
        alert(
          'Image upload failed. Please verify your ImgBB configuration key.',
        );
      }
    } catch (err) {
      console.error('ImgBB Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Form submit persistence handler

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const updatedCompany = {
      name: data.name,
      industry: data.industry,
      website: data.website.startsWith('http')
        ? data.website
        : `https://${data.website}`,
      location: data.location,
      employeeRange: data.employeeRange,
      logo: logoUrl || '',
      description: data.description,
      status: data && data.status ? data.status : 'pending',
      recruiterId: recruiter.id,
      recruiterEmail: recruiter.email,
    };

    setCompanies(updatedCompany);
    console.log('Update C.', updatedCompany);
    console.log('C.', company);

    // POST company
    const res = await createCompany(updatedCompany);
    if (res.insertedID) {
      alert('ok');
    }

    setIsEditing(false);
  };

  const openFormLayout = () => {
    setLogoUrl(company?.logo || '');
    setIsEditing(true);
  };

  // ================= VIEW STATE 1: REGISTER / EDIT FORM =================
  if (isEditing) {
    return (
      <section className="w-full bg-[#090a0b] text-white py-12 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl bg-[#121315] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Block Panel */}
          <div className="p-6 border-b border-white/[0.06] flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {company ? 'Edit Company Profile' : 'Register New Company'}
              </h2>
              <p className="text-xs sm:text-sm text-[#71717a]">
                Enter your business details to start hiring on HireLoop.
              </p>
            </div>
            <button
              type="button"
              onClick={() => company && setIsEditing(false)}
              className="text-[#52525b] hover:text-white transition-colors text-lg"
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>

          <Form
            className="p-6 flex flex-col gap-6"
            onSubmit={handleSubmit}
            validationBehavior="native"
          >
            {/* Grid Row 1: Company Name & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Company Name
                </Label>
                {/* 🌟 FIX 2: Move "name" and "defaultValue" attributes directly to the child <Input /> components */}
                <Input
                  name="name"
                  defaultValue={company?.name || ''}
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white placeholder-[#52525b] px-4 text-sm focus:outline-none"
                />
              </TextField>

              <div className="w-full flex flex-col gap-1.5">
                <label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Industry / Category
                </label>
                <Select
                  name="industry"
                  placeholder="Select Industry"
                  defaultSelectedKeys={[company?.industry || 'tech']}
                  className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white text-sm"
                >
                  <Select.Trigger className="w-full h-full px-4 flex items-center justify-between text-left">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#18191b] border border-white/10 rounded-xl p-1 text-white">
                      <ListBox.Item
                        id="tech"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Technology
                      </ListBox.Item>
                      <ListBox.Item
                        id="finance"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Finance & Banking
                      </ListBox.Item>
                      <ListBox.Item
                        id="healthcare"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        Healthcare
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Grid Row 2: Website & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Website URL
                </Label>
                <div className="relative flex items-center bg-[#18191b] border border-white/5 rounded-xl overflow-hidden h-11">
                  <span className="h-full bg-white/[0.02] border-r border-white/5 px-4 flex items-center text-xs text-[#52525b]">
                    https://
                  </span>
                  {/* 🌟 FIX 2: Move attributes directly to the child input */}
                  <Input
                    name="website"
                    defaultValue={
                      company?.website?.replace('https://', '') || ''
                    }
                    placeholder="www.company.com"
                    className="w-full bg-transparent h-full text-white placeholder-[#52525b] px-3 text-sm focus:outline-none"
                  />
                </div>
              </TextField>

              <TextField isRequired className="w-full flex flex-col gap-1.5">
                <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Location
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 z-10 text-[#52525b]">
                    <MapPin width={16} height={16} />
                  </span>
                  {/* 🌟 FIX 2: Move attributes directly to the child input */}
                  <Input
                    name="location"
                    defaultValue={company?.location || ''}
                    placeholder="City, Country"
                    className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white pl-11 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </TextField>
            </div>

            {/* Grid Row 3: Employee Count Range & ImgBB File Upload Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-gray-300 font-medium text-xs sm:text-sm">
                  Employee Count Range
                </label>
                <Select
                  name="employeeRange"
                  placeholder="Select Scale"
                  defaultSelectedKeys={[company?.employeeRange || '1-10']}
                  className="w-full bg-[#18191b] border border-white/5 h-11 rounded-xl text-white text-sm"
                >
                  <Select.Trigger className="w-full h-full px-4 flex items-center justify-between text-left">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox className="bg-[#18191b] border border-white/10 rounded-xl p-1 text-white">
                      <ListBox.Item
                        id="1-10"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        1-10 employees
                      </ListBox.Item>
                      <ListBox.Item
                        id="11-50"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        11-50 employees
                      </ListBox.Item>
                      <ListBox.Item
                        id="51-200"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        51-200 employees
                      </ListBox.Item>
                      <ListBox.Item
                        id="201+"
                        className="p-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm"
                      >
                        201+ employees
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Upload IMAGE Panel Context Box */}
              <div className="flex flex-col gap-1.5">
                <span className="text-gray-300 font-medium text-xs sm:text-sm">
                  Company Logo
                </span>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#18191b] border border-dashed border-white/10 hover:border-white/20 transition-all rounded-xl h-11 px-4 flex items-center gap-3 cursor-pointer overflow-hidden"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center text-gray-400">
                    <UploadCloud size={14} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs font-medium text-white truncate">
                      {isUploading
                        ? 'Uploading to ImgBB...'
                        : logoUrl
                          ? 'Change image asset'
                          : 'Upload image'}
                    </span>
                    <span className="text-[10px] text-[#52525b] truncate">
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                  {/* 🌟 FIX 1: Instant preview container rendering with native img binding backup */}
                  {logoUrl && !isUploading && (
                    <Avatar
                      src={logoUrl}
                      key={logoUrl}
                      className="w-7 h-7 rounded-md object-cover"
                      size="sm"
                      radius="sm"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Brief Description */}
            <TextField isRequired className="w-full flex flex-col gap-1.5">
              <Label className="text-gray-300 font-medium text-xs sm:text-sm">
                Brief Description
              </Label>
              {/* 🌟 FIX 2: Move attributes directly to the child component */}
              <TextArea
                name="description"
                defaultValue={company?.description || ''}
                rows={4}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full bg-[#18191b] border border-white/5 rounded-xl text-white placeholder-[#52525b] p-4 text-sm focus:outline-none"
              />
            </TextField>

            {/* Bottom Actions Layout Row */}
            <div className="mt-4 -mx-6 -mb-6 p-4 bg-[#18191b] border-t border-white/[0.06] flex justify-end gap-3">
              {company && (
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-white border-none text-sm px-5 h-10 rounded-xl bg-transparent"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                isDisabled={isUploading}
                className="px-6 h-10 rounded-xl text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all"
              >
                {company ? 'Save Changes' : 'Register Company'}
              </Button>
            </div>
          </Form>
        </div>
      </section>
    );
  }

  {
    /* ================= VIEW STATE 2: EMPTY STATE PROMPT ================= */
  }
  if (!company) {
    return (
      <section className="w-full bg-[#090a0b] text-white py-12 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-[#121315] border border-white/[0.06] rounded-2xl p-8 text-center shadow-2xl flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-gray-400 shadow-inner">
            <Building2 size={28} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl font-bold tracking-tight text-white">
              No Registered Company
            </h2>
            <p className="text-xs sm:text-sm text-[#71717a] max-w-xs mx-auto">
              You need to configure a registered entity dashboard container
              layout before creating active job openings.
            </p>
          </div>
          <Button
            onClick={openFormLayout}
            className="h-10 px-5 bg-white text-black font-semibold rounded-xl text-sm flex items-center gap-2 hover:bg-gray-200 transition-all shadow-lg"
          >
            <Plus size={16} /> Register Company
          </Button>
        </div>
      </section>
    );
  }

  {
    /* ================= VIEW STATE 3: REGISTERED COMPONENT DETAILS VIEW ================= */
  }
  return (
    <section className="w-full bg-[#090a0b] text-white py-12 px-4 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl bg-[#121315] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.01] to-transparent flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={company.logo}
              key={company.logo}
              className="w-14 h-14 rounded-xl border border-white/10 shadow-lg object-cover"
              radius="xl"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {company.name}
                </h2>
                <Chip
                  variant="flat"
                  className={`${currentStatus.bg} ${currentStatus.text} ${currentStatus.border} border text-[11px] font-semibold h-5 px-2 capitalize`}
                >
                  {company.status}
                </Chip>
              </div>
              <span className="text-xs text-[#71717a] capitalize">
                Industry: {company.industry}
              </span>
            </div>
          </div>

          <Button
            onClick={openFormLayout}
            className="bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 h-9 px-4 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
          >
            <Pencil size={13} /> Edit Profile
          </Button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/[0.04]">
          <div className="bg-white/[0.01] border border-white/[0.04] p-3.5 rounded-xl flex items-center gap-3">
            <div className="text-gray-400">
              <Globe size={18} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider">
                Website
              </span>
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:underline font-medium truncate mt-0.5"
              >
                {company?.website?.replace('https://', '') || 'No website'}
              </a>
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/[0.04] p-3.5 rounded-xl flex items-center gap-3">
            <div className="text-gray-400">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider">
                HQ Location
              </span>
              <span className="text-xs text-gray-200 font-medium truncate mt-0.5">
                {company.location}
              </span>
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/[0.04] p-3.5 rounded-xl flex items-center gap-3">
            <div className="text-gray-400">
              <Users size={18} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#71717a] uppercase font-bold tracking-wider">
                Company Scale
              </span>
              <span className="text-xs text-gray-200 font-medium truncate mt-0.5">
                {company.employeeRange} staff
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/[0.005]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6366f1] mb-2">
            Company Overview
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            {company.description}
          </p>
        </div>

        {company.status === 'pending' && (
          <div className="bg-[#1c150c] border-t border-[#eab308]/10 p-4 text-center text-xs text-[#f59e0b]">
            Your company details are currently pending administrator validation.
            It will display publicly once approved.
          </div>
        )}
      </div>
    </section>
  );
}

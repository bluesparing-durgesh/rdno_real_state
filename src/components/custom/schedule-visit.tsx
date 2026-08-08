"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Video,
  MapPin,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { ScheduleSchema, type ScheduleFormValues } from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";

interface ScheduleVisitProps {
  propertyName: string;
  propertyPrice?: number;
}

export function ScheduleVisit({ propertyName, propertyPrice }: ScheduleVisitProps) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      tourType: "in-person",
    },
  });

  const tourType = watch("tourType");

  const onSubmit = async (data: ScheduleFormValues) => {
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    reset();
  };

  const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-[#0F172A]/40 border border-black/[0.06] dark:border-white/[0.06] shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-secondary dark:text-accent" size={20} />
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
          Schedule Private Tour
        </h3>
      </div>

      {propertyPrice && (
        <div className="p-4 bg-zinc-50 dark:bg-white/[0.02] rounded-2xl mb-6">
          <p className="text-[9px] uppercase tracking-wider text-zinc-400">Selected Asset</p>
          <h4 className="text-xs font-bold text-zinc-900 dark:text-white mt-0.5">{propertyName}</h4>
          <p className="text-xs font-bold text-secondary dark:text-accent mt-0.5">
            {formatPrice(propertyPrice)}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="schedule-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Tour Type */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setValue("tourType", "in-person")}
                className={`py-3 rounded-2xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  tourType === "in-person"
                    ? "bg-primary dark:bg-white text-white dark:text-primary border-primary dark:border-white"
                    : "bg-transparent border-black/10 dark:border-white/10 text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                <MapPin size={12} /> In-Person Tour
              </button>
              <button
                type="button"
                onClick={() => setValue("tourType", "video-call")}
                className={`py-3 rounded-2xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  tourType === "video-call"
                    ? "bg-primary dark:bg-white text-white dark:text-primary border-primary dark:border-white"
                    : "bg-transparent border-black/10 dark:border-white/10 text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                <Video size={12} /> Virtual Video Tour
              </button>
            </div>

            {/* Name */}
            <div className="space-y-1 relative">
              <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Aditya Singhania"
                  {...register("name")}
                  className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-900 dark:text-white"
                />
                <User size={12} className="absolute left-3.5 top-3.5 text-zinc-400" />
              </div>
              {errors.name && (
                <p className="text-[10px] text-red-500 pl-2">{errors.name.message}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="aditya@gmail.com"
                    {...register("email")}
                    className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-900 dark:text-white"
                  />
                  <Mail size={12} className="absolute left-3.5 top-3.5 text-zinc-400" />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 pl-2">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    {...register("phone")}
                    className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-900 dark:text-white"
                  />
                  <Phone size={12} className="absolute left-3.5 top-3.5 text-zinc-400" />
                </div>
                {errors.phone && (
                  <p className="text-[10px] text-red-500 pl-2">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("date")}
                    className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-900 dark:text-white"
                  />
                  <Calendar size={12} className="absolute left-3.5 top-3.5 text-zinc-400" />
                </div>
                {errors.date && (
                  <p className="text-[10px] text-red-500 pl-2">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <select
                    {...register("time")}
                    className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-900 dark:text-white appearance-none"
                  >
                    <option value="">Select a Slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <Clock size={12} className="absolute left-3.5 top-3.5 text-zinc-400" />
                </div>
                {errors.time && (
                  <p className="text-[10px] text-red-500 pl-2">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 pl-2">
                Special Requests
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Any requirements (e.g. wheelchair access, interpreter, helicopter pad check...)"
                  {...register("notes")}
                  className="w-full bg-zinc-50 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-secondary dark:focus:border-accent text-zinc-900 dark:text-white resize-none"
                />
                <MessageSquare size={12} className="absolute left-3.5 top-3.5 text-zinc-400" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-secondary text-white dark:bg-accent dark:text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-2xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {isSubmitting ? "Securing Slot..." : "Request Reservation"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
              Tour Slot Requested
            </h4>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
              Your luxury advisory specialist will contact you shortly to confirm the security details for your private briefing.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 text-xs text-secondary dark:text-accent font-bold uppercase tracking-wider hover:underline"
            >
              Book Another Visit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

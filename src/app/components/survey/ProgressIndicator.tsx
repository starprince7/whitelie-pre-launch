'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-neutral-400">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{progress}% Complete</span>
      </div>
      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FDCA64] transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface ProgressProps {
  step: number;
  labels: string[];
}

const Progress: React.FC<ProgressProps> = ({ step, labels }) => {
  return (
    <div className="w-full">
      <div className="relative pt-1">
        <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-300">
          {labels.map((label, index) => (
            <div key={index} className={`flex-1 ${index < step ? 'bg-primary' : ''}`} />
          ))}
        </div>
        <div className="flex justify-between text-xs font-bold">
          {labels.map((label, index) => (
            <div
              key={index}
              className={`w-full text-center ${index === step ? 'text-primary' : ''}`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;

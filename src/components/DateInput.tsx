interface DateProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = ({ value, onChange }: DateProps) => {
  return (
    <div>
      <label className="label" htmlFor="date">
        <span className="label-text">Date</span>
      </label>
      <input type="date" value={value} className={`input-bordered input-primary input w-full`} onChange={onChange} />
    </div>
  );
};

export default DateInput;

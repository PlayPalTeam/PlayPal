import Ava from './Ava';
import { FormInput, FormMultiSelect, FormTextarea, FormTitle } from './FormElement';

const amenities = [
  { label: 'Swimming pool', value: 'swimming-pool' },
  { label: 'Fitness center', value: 'fitness-center' },
  { label: 'Free Wi-Fi', value: 'free-wifi' }
];

const sports = [
  { label: 'Football', value: 'football' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Tennis', value: 'tennis' }
];

interface StepProps {
  title?: string;
}

export const Step1: React.FC<StepProps> = ({ title }) => {
  return (
    <div className="mb-6 flex flex-wrap justify-between">
      {title && <FormTitle title={title} />}
      <div className="mb-2 w-full px-3 md:w-1/3">
        <FormInput
          label="Name"
          name="turf_name"
          placeholder="Enter your turf name..."
          className="ocus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-2 w-full px-3 md:w-1/3">
        <FormInput
          label="Price(hour)"
          name="price"
          placeholder="Enter your price"
          className="ocus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-2 w-full px-3 md:w-1/3">
        <FormInput
          label="Capacity"
          name="capacity"
          placeholder="Enter your turf capacity"
          className="focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export const Step2: React.FC<StepProps> = ({ title }) => {
  return (
    <>
      {title && <FormTitle title={title} />}
      <FormTextarea label="Description" name="description" />
      <FormTextarea label="Address" name="address" />
    </>
  );
};

export const Step3: React.FC<StepProps> = ({ title }) => {
  return (
    <>
      {title && <FormTitle title={title} />}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <FormInput
            label="Opening Time (24h)"
            name="open_hour"
            type="time"
            className="focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <FormInput
            label="Closing Time (24h)"
            name="close_hour"
            type="time"
            className="focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Please enter opening and closing time in 24-hour format. For example, 14:00 for 2:00 PM.
      </p>
    </>
  );
};

export const Step4: React.FC<StepProps> = ({ title }) => {
  return (
    <>
      {title && <FormTitle title={title} />}
      <FormMultiSelect isMulti label="Amenities" name="amenities" options={amenities} />
      <FormMultiSelect isMulti label="Sports" name="sports" options={sports} />
    </>
  );
};

interface Step5Props extends StepProps {
  id: string;
}

export const Step5 = ({ id, title }: Step5Props) => {
  return (
    <>
      {title && <FormTitle title={title} />}
      <Ava showUploadButton turf_image id={id} className="h-40 w-40" />
    </>
  );
};

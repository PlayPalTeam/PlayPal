import Ava from './Ava';
import { FormTitle, FormInput, FormTextarea, FormMultiSelect } from './FormElement';

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

export const Step1 = () => {
  return (
    <>
      <FormTitle title="Step 1: Turf Information" />
      <FormInput label="Name" name="turf_name" placeholder="Enter your turf name..." />
      <FormInput label="Price(hour)" name="price" placeholder="Enter your price" />
      <FormInput label="Capacity" name="capacity" placeholder="Enter your turf capacity" />
    </>
  );
};

export const Step2 = () => {
  return (
    <>
      <FormTitle title="Step 2: Description and Address" />
      <FormTextarea label="Description" name="description" />
      <FormTextarea label="Address" name="address" />
    </>
  );
};

export const Step3 = () => {
  return (
    <>
      <FormTitle title="Step 3: Opening and Closing Time" />
      <FormInput label="Opening Time" name="open_hour" type="time" />
      <FormInput label="Closing Time" name="close_hour" type="time" />
    </>
  );
};

export const Step4 = () => {
  return (
    <>
      <FormTitle title="Step 4: Amenities and Sports" />
      <FormMultiSelect isMulti label="Amenities" name="amenities" options={amenities} />
      <FormMultiSelect isMulti label="Sports" name="sports" options={sports} />
    </>
  );
};

interface Step5Props {
  id: string;
}

export const Step5 = ({ id }: Step5Props) => {
  return (
    <>
      <FormTitle title="Step 5: Add a photo of the turf" />
      <Avatar showUploadButton turf_image id={id} className="h-40 w-40" />
      <Link href='/lister' className='btn-primary btn w-full '>Return Home</Link>
    </>
  );
};

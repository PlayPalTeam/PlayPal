'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { cn } from '@/lib/utils';

const options = [
  {
    value: 'dark',
    label: 'Dark'
  },
  {
    value: 'light',
    label: 'Light'
  },
  {
    value: 'system',
    label: 'System'
  }
];

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? options.find((option) => option.value === value)?.label : 'Select option...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.label}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setTheme(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitch;

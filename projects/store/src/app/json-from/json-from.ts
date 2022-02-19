import { FormlyFieldConfig } from '@ngx-formly/core';

export const jsonFormFields: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    defaultValue: 'Mukesh',
    templateOptions: {
      label: 'Name',
      placeholder: 'Name',
      required: true,
    },
    validation: {
      messages: {
        required: (error, field: FormlyFieldConfig) =>
          `"${field?.formControl?.value}" is required`,
      },
    },
  },
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email',
      placeholder: 'Email',
      required: true,
      hideLabel: true,
      // hideRequiredMarker: true,
    },
  },

  {
    key: 'Password',
    type: 'input',
    templateOptions: {
      label: 'Password',
      placeholder: 'Password',
      type: 'password',
      required: true,
    },
  },
  {
    key: 'save',
    type: 'boolean',
    templateOptions: {
      label: 'Save details',
      placeholder: 'Name',
      type: 'password',
      required: true,
    },
  },
  {
    key: 'marvel1',
    type: 'select',
    templateOptions: {
      label: 'Normal Select',
      options: [
        { label: 'Iron Man', value: 'iron_man' },
        { label: 'Captain America', value: 'captain_america' },
        { label: 'Black Widow', value: 'black_widow' },
        { label: 'Hulk', value: 'hulk' },
        { label: 'Captain Marvel', value: 'captain_marvel' },
      ],
    },
  },
  {
    key: 'marvel2',
    type: 'select',
    templateOptions: {
      label: 'Grouped Select',
      placeholder: 'Select marvel 1',
      options: [
        { label: 'Iron Man', value: 'iron_man', group: 'Male' },
        { label: 'Captain America', value: 'captain_america', group: 'Male' },
        { label: 'Black Widow', value: 'black_widow', group: 'Female' },
        { label: 'Hulk', value: 'hulk', group: 'Male' },
        { label: 'Captain Marvel', value: 'captain_marvel', group: 'Female' },
      ],
    },
  },
  {
    key: 'address',
    wrappers: ['panel'],
    templateOptions: { label: 'Address' },
    fieldGroup: [
      {
        key: 'town',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'Town',
        },
      },
    ],
  },
];

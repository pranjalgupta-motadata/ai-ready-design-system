import type { Meta, StoryObj } from '@storybook/react-vite';
import { Compare } from './Compare';

/**
 * Atom-level components, shown side by side across the four product design
 * systems, so one version can be chosen to carry into this design system.
 *
 * Each specimen renders in a shadow root with its own team's stylesheet, so
 * what you see is a fair likeness of the real thing rather than a redrawing.
 *
 * Molecules are deliberately absent - Card, Banner, KPI tile, Empty state,
 * Wizard stepper, tables, navigation and overlays are all a later decision.
 */
const meta: Meta<typeof Compare> = {
  title: 'Atoms',
  component: Compare,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Actions ---------------------------------------------------------------

export const Button: Story = {
  name: 'Button',
  args: { atomId: 'button' },
};

export const IconButton: Story = {
  name: 'Icon button',
  args: { atomId: 'icon-button' },
};

// --- Forms -----------------------------------------------------------------

export const TextInput: Story = {
  name: 'Text input',
  args: { atomId: 'text-input' },
};

export const SelectSearchTextarea: Story = {
  name: 'Select / Search / Textarea',
  args: { atomId: 'select-search-input-textarea' },
};

export const CheckboxRadioSwitch: Story = {
  name: 'Checkbox / Radio / Switch',
  args: { atomId: 'checkbox-radio-switch' },
};

// --- Badges ----------------------------------------------------------------

export const StatusPill: Story = {
  name: 'Status pill',
  args: { atomId: 'status-pill' },
};

export const Chip: Story = {
  name: 'Chip / meta pill',
  args: { atomId: 'chip-meta-pill' },
};

export const MicroLabelAndCounts: Story = {
  name: 'Micro-label & count badges',
  args: { atomId: 'micro-label-count-badges' },
};

export const TestStatusLabel: Story = {
  name: 'Test status label',
  args: { atomId: 'test-status-label' },
};

export const ProtocolAndStoreBadges: Story = {
  name: 'Protocol & store badges',
  args: { atomId: 'protocol-store-badges' },
};

// --- Data display ----------------------------------------------------------

export const Avatar: Story = {
  name: 'Avatar & avatar stack',
  args: { atomId: 'avatar-avatar-stack' },
};

export const IconTile: Story = {
  name: 'Icon tile',
  args: { atomId: 'icon-tile' },
};

export const SecretDots: Story = {
  name: 'Secret dots',
  args: { atomId: 'secret-dots' },
};

export const CodeWells: Story = {
  name: 'Code / mono wells',
  args: { atomId: 'code-mono-wells' },
};

export const Progress: Story = {
  name: 'Progress meters & bars',
  args: { atomId: 'progress-meters-bars' },
};

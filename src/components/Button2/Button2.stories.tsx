import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button2 } from './Button2';
import { Icon } from '../Icon';

const meta: Meta<typeof Button2> = {
  title: 'Components/Button2',
  component: Button2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'A reworked Button with four axes and eight props.',
          '',
          '| Axis | Prop | Values |',
          '| --- | --- | --- |',
          '| Style | `variant` | primary · secondary · outline · ghost · link · destructive · success |',
          '| Size | `size` | xs · sm · md · lg · xl |',
          '| Corners | `radius` | none · sm · md · lg · full |',
          '| Depth | `elevation` | 0 · 1 · 2 · 3 |',
          '',
          '**Icon layout is not a prop.** Pass `startIcon` and/or `endIcon`; leave out the label',
          'and you get an icon-only button. That makes the five layouts impossible to get wrong.',
          '',
          'An icon-only button **requires `aria-label`** — TypeScript will not compile without it.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    variant: { table: { category: 'Style' } },
    size: { table: { category: 'Style' } },
    radius: { table: { category: 'Style' } },
    elevation: { table: { category: 'Style' } },
    startIcon: { table: { category: 'Content' }, control: false },
    endIcon: { table: { category: 'Content' }, control: false },
    children: { table: { category: 'Content' } },
    loading: { table: { category: 'State' } },
    loadingText: { table: { category: 'State' } },
    disabled: { table: { category: 'State' } },
    href: { table: { category: 'Rendering' } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3">{children}</div>
);

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-flex-col mdt-gap-6">{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mdt-text-xs mdt-font-medium mdt-text-muted-foreground">{children}</p>
);

export const Default: Story = {
  args: { children: 'Save changes' },
};

/** All seven visual styles. */
export const Variants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Stack>
      <div>
        <Label>Solid</Label>
        <Row>
          <Button2 variant="primary">Primary</Button2>
          <Button2 variant="secondary">Secondary</Button2>
          <Button2 variant="destructive">Destructive</Button2>
          <Button2 variant="success">Success</Button2>
        </Row>
      </div>
      <div>
        <Label>Quiet</Label>
        <Row>
          <Button2 variant="outline">Outline</Button2>
          <Button2 variant="ghost">Ghost</Button2>
          <Button2 variant="link">Link</Button2>
        </Row>
      </div>
    </Stack>
  ),
};

/** Height, padding and text size move together. */
export const Sizes: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Button2 size="xs">Extra small</Button2>
      <Button2 size="sm">Small</Button2>
      <Button2 size="md">Medium</Button2>
      <Button2 size="lg">Large</Button2>
      <Button2 size="xl">Extra large</Button2>
    </Row>
  ),
};

/** The five layouts, all derived from what you pass rather than a prop. */
export const IconLayouts: Story = {
  name: 'Icon layouts',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Stack>
      <div>
        <Label>Text only</Label>
        <Row>
          <Button2>Continue</Button2>
        </Row>
      </div>
      <div>
        <Label>Left icon + text</Label>
        <Row>
          <Button2 startIcon={<Icon name="plus-circle" />}>Add item</Button2>
        </Row>
      </div>
      <div>
        <Label>Text + right icon</Label>
        <Row>
          <Button2 endIcon={<Icon name="arrow-right" />}>Next step</Button2>
        </Row>
      </div>
      <div>
        <Label>Left icon + text + right icon</Label>
        <Row>
          <Button2
            startIcon={<Icon name="download-cloud" />}
            endIcon={<Icon name="chevron-down" />}
          >
            Export
          </Button2>
        </Row>
      </div>
      <div>
        <Label>Icon only — aria-label is required</Label>
        <Row>
          <Button2 startIcon={<Icon name="settings-2" />} aria-label="Settings" />
          <Button2
            variant="outline"
            startIcon={<Icon name="trash-2" />}
            aria-label="Delete"
          />
          <Button2
            variant="ghost"
            radius="full"
            startIcon={<Icon name="chevron-right" />}
            aria-label="Next"
          />
        </Row>
      </div>
    </Stack>
  ),
};

/** Loading keeps the button's shape; the spinner takes the start icon's place. */
export const States: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Stack>
      <div>
        <Label>Loading — label unchanged</Label>
        <Row>
          <Button2 loading>Save changes</Button2>
          <Button2 variant="outline" loading>
            Save changes
          </Button2>
        </Row>
      </div>
      <div>
        <Label>Loading — with loadingText</Label>
        <Row>
          <Button2 loading loadingText="Saving…">
            Save changes
          </Button2>
          <Button2 variant="destructive" loading loadingText="Deleting…">
            Delete
          </Button2>
        </Row>
      </div>
      <div>
        <Label>Loading — icon only</Label>
        <Row>
          <Button2 loading startIcon={<Icon name="plus-circle" />} aria-label="Adding" />
        </Row>
      </div>
      <div>
        <Label>Disabled</Label>
        <Row>
          <Button2 disabled>Primary</Button2>
          <Button2 variant="outline" disabled>
            Outline
          </Button2>
          <Button2 variant="ghost" disabled>
            Ghost
          </Button2>
        </Row>
      </div>
    </Stack>
  ),
};

/** `full` gives a pill, or a circle when the button is icon-only. */
export const Radius: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Button2 radius="none">None</Button2>
      <Button2 radius="sm">Small</Button2>
      <Button2 radius="md">Medium</Button2>
      <Button2 radius="lg">Large</Button2>
      <Button2 radius="full">Full</Button2>
      <Button2 radius="full" startIcon={<Icon name="plus-circle" />} aria-label="Add" />
    </Row>
  ),
};

export const Elevation: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Button2 elevation={0}>Flat</Button2>
      <Button2 elevation={1}>Raised</Button2>
      <Button2 elevation={2}>Floating</Button2>
      <Button2 elevation={3}>Lifted</Button2>
    </Row>
  ),
};

/** With `href` the button renders as a real link, keeping every style. */
export const AsLink: Story = {
  name: 'As a link',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <Row>
      <Button2 href="https://example.com" target="_blank" endIcon={<Icon name="arrow-right" />}>
        Open docs
      </Button2>
      <Button2 href="https://example.com" variant="link">
        Inline link
      </Button2>
      <Button2 href="https://example.com" disabled>
        Disabled link
      </Button2>
    </Row>
  ),
};

/** Every variant at every size — the quickest way to spot an odd one out. */
export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const variants = [
      'primary',
      'secondary',
      'outline',
      'ghost',
      'link',
      'destructive',
      'success',
    ] as const;
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    return (
      <div className="mdt-flex mdt-flex-col mdt-gap-4">
        {variants.map((v) => (
          <div key={v}>
            <Label>{v}</Label>
            <Row>
              {sizes.map((s) => (
                <Button2 key={s} variant={v} size={s}>
                  {s}
                </Button2>
              ))}
            </Row>
          </div>
        ))}
      </div>
    );
  },
};

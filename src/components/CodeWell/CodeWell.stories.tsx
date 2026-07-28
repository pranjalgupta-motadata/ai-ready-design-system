import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeWell } from './CodeWell';

const meta: Meta<typeof CodeWell> = {
  title: 'Components/CodeWell',
  component: CodeWell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A read-only monospace surface for commands, tokens, generated config and log output.',
          '',
          '**Both Org Mgmt and Agent Fleet asked for exactly this in their own audits.** Org',
          'Mgmt has three separate wells and recommends extracting one CodeWell with copy and',
          'mask options. Agent Fleet has a light CodeBlock and a hand-rolled DarkTerminalWell,',
          'records three screens bypassing both, and recommends folding them into a single',
          'component with a surface option. This is that component.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'npm install motadata-react-library' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-w-[32rem] mdt-max-w-full mdt-flex-col mdt-gap-6">{children}</div>
);

export const Default: Story = {};

/** Light for values in a panel; dark for terminal output. */
export const Surfaces: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell label="Light — a value in a panel">
        https://motadata.example.com/scim/v2
      </CodeWell>
      <CodeWell surface="dark" label="Dark — terminal output">
        {`$ motadata agent install --token=***
Downloading agent 4.2.1...
Installed. Agent is now reporting.`}
      </CodeWell>
    </Stack>
  ),
};

export const Copyable: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell copyable label="Install command">
        npm install motadata-react-library
      </CodeWell>
      <CodeWell copyable surface="dark" label="Agent bootstrap">
        curl -sSL https://motadata.example.com/install.sh | sh
      </CodeWell>
    </Stack>
  ),
};

/** For tokens and secrets. Copy still copies the real value while masked. */
export const Maskable: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell maskable copyable label="SCIM bearer token">
        scim_live_8f2a91c4e7b6d503a1
      </CodeWell>
      <CodeWell maskable copyable surface="dark" label="Agent token">
        agt_prod_5c1e77b2fa9d40e8
      </CodeWell>
    </Stack>
  ),
};

/** A long line scrolls rather than wrapping, so the shape stays predictable. */
export const LongContent: Story = {
  name: 'Long content',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell copyable label="Connection string">
        jdbc:postgresql://prod-db-01.internal.example.com:5432/motadata?ssl=true&amp;sslmode=verify-full&amp;ApplicationName=motadata-agent
      </CodeWell>
    </Stack>
  ),
};

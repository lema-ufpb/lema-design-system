import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  BanknoteIcon,
  BuildingIcon,
  FileSearchIcon,
  MapPinIcon,
  ShieldAlertIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import {
  MiniCard,
  MiniCardGroup,
  MiniCardSeparator,
  MiniCardStrip,
} from "@/components/custom/mini-card"

// ── Meta ───────────────────────────────────────────────────────────────────

const meta = {
  title: "Data Display/MiniCard",
  component: MiniCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A compact stat label+value unit built for horizontal summary strips.",
          "",
          "Use `MiniCard` standalone or compose into `MiniCardGroup` (shared container) and",
          "`MiniCardStrip` (full-width row with auto-dividers). Size propagates via context",
          "so setting it once on `MiniCardGroup` is enough for all children.",
          "",
          "## Composition",
          "```tsx",
          "<MiniCardStrip>",
          '  <MiniCardGroup variant="outlined" size="md">',
          '    <MiniCard label="Total" value={1450} icon={UsersIcon} />',
          '    <MiniCard label="Avg Risk" value="High (78)" intent="warning" />',
          "  </MiniCardGroup>",
          '  <MiniCardGroup variant="pill" divide>',
          '    <MiniCard label="Selected" value={53} />',
          '    <MiniCard label="Capacity" value={53} sub="/153" />',
          "  </MiniCardGroup>",
          "</MiniCardStrip>",
          "```",
          "",
          "## Design Tokens",
          "",
          "| Element | Token |",
          "| --- | --- |",
          "| Label | `--muted-foreground` |",
          "| Value | `--foreground` |",
          "| Pill bg | `--muted/40` |",
          "| Outlined bg | `--card/80` |",
          "| Success value | `--success` |",
          "| Warning value | `--warning` |",
          "| Destructive value | `--destructive` |",
          "| Separator | `--border` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    intent: {
      control: "select",
      options: ["default", "success", "warning", "destructive"],
      table: { defaultValue: { summary: "default" } },
    },
    iconIntent: {
      control: "select",
      options: ["default", "success", "warning", "destructive"],
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    label: "Contribuintes",
    value: 1450,
  },
} satisfies Meta<typeof MiniCard>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Minimal — just a label and a value. No icon, no sub, no delta.",
      },
    },
  },
}

export const WithIcon: Story = {
  args: {
    label: "Contribuintes",
    value: 1450,
    icon: UsersIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "An icon placed before the label/value stack. Use `iconIntent` to color it independently from the value.",
      },
    },
  },
}

export const WithSub: Story = {
  args: {
    label: "Capac. Usada",
    value: 53,
    sub: "/153",
  },
  parameters: {
    docs: {
      description: {
        story:
          'The `sub` prop renders a muted secondary value at baseline — ideal for "used/total" patterns.',
      },
    },
  },
}

export const WithDelta: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <MiniCard label="Receita" value="R$ 2.4M" delta="+18%" />
        <MiniCard label="Pendências" value={47} delta="-12" />
        <MiniCard label="Auditados" value={95} delta="neutral" />
        <MiniCard label="Selecionados" value={53} delta="up" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Pass a signed string like `"+18%"` and direction is inferred automatically. Or pass `"up"` / `"down"` / `"neutral"` for icon-only indicators.',
      },
    },
  },
}

export const FormatValues: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          format: integer — pt-BR locale
        </p>
        <div className="flex items-center gap-6">
          <MiniCard
            label="Contribuintes"
            value={1234567}
            format="integer"
            locale="pt-BR"
          />
          <MiniCard
            label="Selecionados"
            value={53}
            format="integer"
            locale="pt-BR"
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          format: currency — pt-BR / BRL
        </p>
        <div className="flex items-center gap-6">
          <MiniCard
            label="Potencial Total"
            value={4200000}
            format="currency"
            locale="pt-BR"
            currency="BRL"
            decimals={0}
          />
          <MiniCard
            label="Recuperação"
            value={1823000}
            format="currency"
            locale="pt-BR"
            currency="BRL"
            decimals={0}
            intent="success"
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">format: percent</p>
        <div className="flex items-center gap-6">
          <MiniCard
            label="Capac. Usada"
            value={34.6}
            format="percent"
            locale="pt-BR"
          />
          <MiniCard
            label="Cobertura"
            value={78.4}
            format="percent"
            locale="pt-BR"
            intent="warning"
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          format: float — 2 decimals
        </p>
        <div className="flex items-center gap-6">
          <MiniCard
            label="Score Médio"
            value={7.83}
            format="float"
            decimals={2}
          />
          <MiniCard label="Desvio" value={1.241} format="float" decimals={3} />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Locale via MiniCardGroup — all children inherit
        </p>
        <MiniCardGroup locale="pt-BR" divide>
          <MiniCard
            label="Total"
            value={4200000}
            format="currency"
            currency="BRL"
            decimals={0}
          />
          <MiniCard label="Selecionados" value={53} format="integer" />
          <MiniCard label="Cobertura" value={78.4} format="percent" />
        </MiniCardGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `format`, `locale`, `currency`, and `decimals` to format numeric values. Set `locale` on `MiniCardGroup` and all children inherit it — override per-card when needed.",
      },
    },
  },
}

export const Intents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(
        [
          ["default", "Selecionados", 53],
          ["success", "Concluídos", 84],
          ["warning", "Risco Médio", "Alto (78.4)"],
          ["destructive", "Pendências", 12],
        ] as const
      ).map(([intent, label, value]) => (
        <div key={intent} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-xs font-medium text-muted-foreground">
            {intent}
          </span>
          <MiniCard label={label} value={value} intent={intent} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `intent` prop applies a semantic color to the primary value. Use it to communicate status at a glance.",
      },
    },
  },
}

export const IconIntents: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <MiniCard
        label="Total"
        value={1450}
        icon={UsersIcon}
        iconIntent="default"
      />
      <MiniCard
        label="Auditados"
        value={84}
        icon={FileSearchIcon}
        iconIntent="success"
      />
      <MiniCard
        label="Risco Médio"
        value="Alto (78.4)"
        icon={ShieldAlertIcon}
        iconIntent="warning"
      />
      <MiniCard
        label="Pendências"
        value={12}
        icon={ZapIcon}
        iconIntent="destructive"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `iconIntent` prop colors the icon independently from the value — useful when the icon signals a category but the value uses a different semantic.",
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-6">
          <span className="w-6 shrink-0 text-xs font-medium text-muted-foreground">
            {size}
          </span>
          <MiniCard
            label="Contribuintes"
            value={1450}
            icon={UsersIcon}
            size={size}
          />
          <MiniCard label="Capac. Usada" value={53} sub="/153" size={size} />
          <MiniCard
            label="Risco Médio"
            value="Alto (78.4)"
            intent="warning"
            icon={ShieldAlertIcon}
            iconIntent="warning"
            size={size}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All three size presets. Typography scales with `text-xs / text-sm / text-base` for values and matching label sizes.",
      },
    },
  },
}

export const GroupVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(
        [
          ["ghost", "No container"],
          ["pill", "Muted fill"],
          ["outlined", "Border + card bg"],
          ["elevated", "Border + shadow"],
        ] as const
      ).map(([variant, desc]) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-32 shrink-0 text-xs text-muted-foreground">
            {desc}
          </span>
          <MiniCardGroup variant={variant} size="md" divide>
            <MiniCard label="Selecionados" value={53} />
            <MiniCard label="Capac. Usada" value={53} sub="/153" />
            <MiniCard label="Restante" value={100} />
          </MiniCardGroup>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Four group container styles. `divide` inserts short separators automatically between children.",
      },
    },
  },
}

export const GroupAccents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["success", "warning", "destructive"] as const).map((accent) => (
        <MiniCardGroup
          key={accent}
          variant="outlined"
          size="md"
          divide
          accent={accent}
        >
          <MiniCard
            label="Status"
            value={
              accent === "success"
                ? "Normal"
                : accent === "warning"
                  ? "Atenção"
                  : "Crítico"
            }
            intent={accent}
          />
          <MiniCard
            label="Contribuintes"
            value={accent === "success" ? 84 : accent === "warning" ? 32 : 8}
          />
          <MiniCard
            label="% do Total"
            value={
              accent === "success" ? "88%" : accent === "warning" ? "33%" : "8%"
            }
          />
        </MiniCardGroup>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `accent` prop adds a semantic left-border highlight to the group container — useful for status-coded panels in dashboards.",
      },
    },
  },
}

export const SizeFromGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <MiniCardGroup key={size} variant="outlined" size={size} divide>
          <MiniCard label="Contribuintes" value={1450} icon={UsersIcon} />
          <MiniCard label="Selecionados" value={53} />
          <MiniCard label="Capac. Usada" value={53} sub="/153" />
          <MiniCard label="Restante" value={100} />
        </MiniCardGroup>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Set `size` on the group and all children inherit it via context — no need to repeat the prop on each card.",
      },
    },
  },
}

export const StripLayout: Story = {
  render: () => (
    <MiniCardStrip>
      <MiniCardGroup variant="outlined" size="md" divide>
        <MiniCard label="Contribuintes" value={1450} icon={UsersIcon} />
        <MiniCard
          label="Risco Médio"
          value="Alto (78.4)"
          intent="warning"
          icon={ShieldAlertIcon}
          iconIntent="warning"
        />
      </MiniCardGroup>

      <MiniCardGroup variant="pill" size="md" divide>
        <MiniCard label="Selecionados" value={53} />
        <MiniCard label="Capac. Usada" value={53} sub="/153" />
        <MiniCard label="Restante" value={100} />
      </MiniCardGroup>

      <MiniCardGroup size="md" divide>
        <MiniCard label="Auditoria Normal" value={32} sub="/95" />
        <MiniCard label="Malhas Fiscais" value={21} sub="/75" />
      </MiniCardGroup>

      <MiniCard label="Regionais" value={5} icon={MapPinIcon} />
    </MiniCardStrip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full horizontal strip — `MiniCardStrip` auto-inserts tall separators between its children. Groups can mix variants while the strip handles global spacing.",
      },
    },
  },
}

export const RiskMatrixSummaryBar: Story = {
  render: () => (
    <div className="flex h-16 w-full items-center border-b bg-background px-6">
      <MiniCardStrip scroll className="w-full justify-end">
        <MiniCardGroup variant="outlined" size="md" divide>
          <MiniCard label="Contribuintes" value={1450} icon={UsersIcon} />
          <MiniCard
            label="Risco Médio"
            value="Alto (78.4)"
            intent="warning"
            icon={ShieldAlertIcon}
            iconIntent="warning"
          />
        </MiniCardGroup>

        <MiniCardGroup variant="pill" size="md" divide>
          <MiniCard label="Selecionados" value={53} />
          <MiniCard label="Capac. Usada" value={53} sub="/153" />
          <MiniCard label="Restante" value={100} />
        </MiniCardGroup>

        <MiniCardGroup size="md" divide>
          <MiniCard label="Auditoria Normal" value={32} sub="/95" />
          <MiniCard label="Malhas Fiscais" value={21} sub="/75" />
        </MiniCardGroup>

        <MiniCard label="Regionais" value={5} icon={MapPinIcon} />
      </MiniCardStrip>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Replica of the risk-matrix summary bar from the design reference — a full horizontal strip inside a `h-16` toolbar.",
      },
    },
  },
}

export const FinancialStrip: Story = {
  render: () => (
    <MiniCardStrip>
      <MiniCardGroup variant="elevated" size="md" divide accent="success">
        <MiniCard
          label="Potencial Total"
          value="R$ 4,2M"
          icon={BanknoteIcon}
          iconIntent="success"
        />
        <MiniCard
          label="Recuperação Esperada"
          value="R$ 1,8M"
          intent="success"
          delta="+22%"
        />
      </MiniCardGroup>

      <MiniCardGroup variant="pill" size="md" divide>
        <MiniCard label="Regionais" value={8} icon={MapPinIcon} />
        <MiniCard label="Segmentos" value={14} icon={BuildingIcon} />
      </MiniCardGroup>
    </MiniCardStrip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Financial summary panel using `elevated` variant with accent border and delta indicators for value change.",
      },
    },
  },
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Single card</p>
        <MiniCard label="Contribuintes" value={0} loading />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Group with divide</p>
        <MiniCardGroup variant="pill" size="md" divide>
          <MiniCard label="Selecionados" value={0} loading />
          <MiniCard label="Capac. Usada" value={0} loading />
          <MiniCard label="Restante" value={0} loading />
        </MiniCardGroup>
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Full strip</p>
        <MiniCardStrip>
          <MiniCardGroup variant="outlined" size="md" divide>
            <MiniCard label="Contribuintes" value={0} loading />
            <MiniCard label="Risco Médio" value={0} loading />
          </MiniCardGroup>
          <MiniCardGroup variant="pill" size="md" divide>
            <MiniCard label="Selecionados" value={0} loading />
            <MiniCard label="Capac. Usada" value={0} loading />
            <MiniCard label="Restante" value={0} loading />
          </MiniCardGroup>
        </MiniCardStrip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton loading state — dimensions match the real content to prevent layout shift.",
      },
    },
  },
}

export const ResponsiveWrap: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          MiniCardStrip wrap — groups move to the next row when there is not
          enough space
        </p>
        <div className="w-[480px] rounded-lg border p-4">
          <MiniCardStrip wrap>
            <MiniCardGroup variant="outlined" size="md">
              <MiniCard label="Contribuintes" value={1450} icon={UsersIcon} />
              <MiniCard
                label="Risco Médio"
                value="Alto (78.4)"
                intent="warning"
                icon={ShieldAlertIcon}
                iconIntent="warning"
              />
            </MiniCardGroup>
            <MiniCardGroup variant="pill" size="md">
              <MiniCard label="Selecionados" value={53} />
              <MiniCard label="Capac. Usada" value={53} sub="/153" />
              <MiniCard label="Restante" value={100} />
            </MiniCardGroup>
            <MiniCardGroup size="md">
              <MiniCard label="Auditoria Normal" value={32} sub="/95" />
              <MiniCard label="Malhas Fiscais" value={21} sub="/75" />
            </MiniCardGroup>
          </MiniCardStrip>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          MiniCardGroup wrap — items inside the group wrap on very narrow
          screens
        </p>
        <div className="w-[260px] rounded-lg border p-4">
          <MiniCardGroup variant="pill" size="md" wrap>
            <MiniCard label="Selecionados" value={53} />
            <MiniCard label="Capac. Usada" value={53} sub="/153" />
            <MiniCard label="Restante" value={100} />
            <MiniCard label="Auditoria Normal" value={32} sub="/95" />
          </MiniCardGroup>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `wrap` on `MiniCardStrip` to let groups flow onto multiple rows. Pass `wrap` on `MiniCardGroup` to let items wrap inside the group. Auto-dividers are disabled when wrapping — groups provide their own visual boundary.",
      },
    },
  },
}

export const Standalone: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <MiniCard label="Selecionados" value={53} />
      <MiniCardSeparator height="tall" />
      <MiniCard label="Capac. Usada" value={53} sub="/153" />
      <MiniCardSeparator height="short" />
      <MiniCard label="Restante" value={100} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Manual composition using `MiniCardSeparator` directly — for layouts where auto-dividers aren't flexible enough.",
      },
    },
  },
}

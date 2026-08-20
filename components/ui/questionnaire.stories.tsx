import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./questionnaire"

const freeformItems = [
  {
    name: "direction",
    required: true,
    choices: [{ value: "delegation" }, { value: "questions" }],
  },
] as const

const questionnaireItems = [
  {
    name: "direction",
    required: true,
    choices: [
      { value: "delegation" },
      { value: "questions" },
      { value: "both" },
    ],
  },
  {
    name: "signals",
    choices: [
      { value: "progress" },
      { value: "decisions" },
      { value: "risks" },
    ],
  },
  {
    name: "timing",
    required: true,
    choices: [{ value: "week" }, { value: "cycle" }, { value: "later" }],
  },
] as const

const disabledItems = [
  {
    name: "direction",
    required: true,
    choices: [{ value: "delegation" }, { value: "questions", disabled: true }],
  },
] as const

const meta = {
  title: "Shadcn UI/Questionnaire",
  component: Questionnaire,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.",
          "",
          "`Questionnaire` owns the ordered items, active item, answer state, validation, progress, and navigation. Compose `QuestionnaireItem` with `QuestionnaireTitle`, `QuestionnaireDescription`, `QuestionnaireChoices`, and `QuestionnaireError`; navigate with `QuestionnairePrevious`, `QuestionnaireSkip`, `QuestionnaireNext`, and `QuestionnaireSubmit`.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Choice background** | `--input` at 20%/40% | Idle and hover choice tray fill |",
          "| **Checked border/fill** | `--primary` / `--primary/10` | Selected answer emphasis |",
          "| **Choice indicator** | `--input/90` / `--primary` | Radio/checkbox indicator fill |",
          "| **Checked indicator text** | `--primary-foreground` | Check icon and dot color |",
          "| **Choice border** | `--border-input` | Choice row outline |",
          "| **Focus ring** | `--ring` / `--ring/50` | Keyboard focus indicator |",
          "| **Error border/ring** | `--destructive` | Validation error highlight |",
          "| **Freeform input** | `bg-input/50` | Translucent answer input tray |",
          "| **Title/Description text** | `--foreground` / `--muted-foreground` | Question and helper text |",
          "| **Progress text** | `--muted-foreground` | Step counter label |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Questionnaire>

export default meta
type Story = StoryObj<typeof meta>

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

function QuestionnaireNavigation({ skip = true }: { skip?: boolean }) {
  return (
    <QuestionnaireActions>
      <QuestionnairePrevious />
      {skip ? <QuestionnaireSkip /> : null}
      <QuestionnaireNext>Next</QuestionnaireNext>
      <QuestionnaireSubmit>Save answers</QuestionnaireSubmit>
    </QuestionnaireActions>
  )
}

function SingleChoiceQuestions() {
  return (
    <>
      <QuestionnaireItem name="direction" required>
        <QuestionnaireTitle>What should we prototype next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose one direction or write another answer.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span className="font-medium">Sub-agent delegation</span>
            <QuestionnaireChoiceDescription>
              Show when work is delegated and what comes back.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions">
            <span className="font-medium">Question prompts</span>
            <QuestionnaireChoiceDescription>
              Show choices while the agent waits for input.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            <span className="font-medium">Both together</span>
            <QuestionnaireChoiceDescription>
              Explore one unified interaction pattern.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Another direction"
            placeholder="Type another direction…"
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="signals" multiple>
        <QuestionnaireTitle>
          What should every progress update include?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Select all that apply, or skip this question.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="progress">Progress</QuestionnaireChoice>
          <QuestionnaireChoice value="decisions">Decisions</QuestionnaireChoice>
          <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="timing" required>
        <QuestionnaireTitle>When should this be revisited?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose when this should be revisited.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="week">This week</QuestionnaireChoice>
          <QuestionnaireChoice value="cycle">Next cycle</QuestionnaireChoice>
          <QuestionnaireChoice value="later">Revisit later</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
    </>
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A three-step questionnaire with single-choice questions, a progress counter, and full navigation actions.",
      },
    },
  },
  render: () => (
    <Questionnaire
      className="mx-auto max-w-lg"
      items={freeformItems}
      defaultItem="direction"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <SingleChoiceQuestions />
      <QuestionnaireNavigation />
    </Questionnaire>
  ),
}

export const MultipleChoice: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A `multiple` item turns fixed choices into checkboxes, read back with `FormData.getAll()` on submit.",
      },
    },
  },
  render: () => (
    <Questionnaire
      className="mx-auto max-w-lg"
      items={questionnaireItems.slice(1, 2)}
      defaultItem="signals"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="signals" multiple>
        <QuestionnaireTitle>
          What should every progress update include?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Select every source that may affect the implementation.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="progress">
            <span className="font-medium">Progress</span>
            <QuestionnaireChoiceDescription>
              Show how much of the work is done.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="decisions">
            <span className="font-medium">Decisions</span>
            <QuestionnaireChoiceDescription>
              Summarize the choices made along the way.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="risks">
            <span className="font-medium">Risks</span>
            <QuestionnaireChoiceDescription>
              Surface anything that might block delivery.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireNavigation />
    </Questionnaire>
  ),
}

export const Freeform: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A required question combining fixed choices with a `QuestionnaireInput` freeform answer.",
      },
    },
  },
  render: () => (
    <Questionnaire
      className="mx-auto max-w-lg"
      items={questionnaireItems.slice(0, 1)}
      defaultItem="direction"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="direction" required>
        <QuestionnaireTitle>What should we prototype next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose a direction or write your own.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span className="font-medium">Sub-agent delegation</span>
            <QuestionnaireChoiceDescription>
              Show when work is delegated and what comes back.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions">
            <span className="font-medium">Question prompts</span>
            <QuestionnaireChoiceDescription>
              Show choices while the agent waits for input.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Another direction"
            placeholder="Type another direction…"
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireNavigation />
    </Questionnaire>
  ),
}

export const WithSkip: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "An optional middle item with an explicit `QuestionnaireSkip` action so it can be intentionally left unanswered.",
      },
    },
  },
  render: () => (
    <Questionnaire
      className="mx-auto max-w-lg"
      items={[
        {
          name: "type",
          required: true,
          choices: [
            { value: "feature" },
            { value: "bugfix" },
            { value: "refactor" },
          ],
        },
        {
          name: "constraints",
          choices: [{ value: "deps" }, { value: "db" }, { value: "api" }],
        },
        {
          name: "review",
          required: true,
          choices: [{ value: "tests" }, { value: "diff" }, { value: "both" }],
        },
      ]}
      defaultItem="type"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="type" required>
        <QuestionnaireTitle>What kind of change is this?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose the category that best describes the work.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="feature">New feature</QuestionnaireChoice>
          <QuestionnaireChoice value="bugfix">Bug fix</QuestionnaireChoice>
          <QuestionnaireChoice value="refactor">Refactor</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="constraints">
        <QuestionnaireTitle>
          Are there any implementation constraints?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Answer if needed, or intentionally skip this question.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="deps">
            Do not add dependencies
          </QuestionnaireChoice>
          <QuestionnaireChoice value="db">
            Do not change the database
          </QuestionnaireChoice>
          <QuestionnaireChoice value="api">
            Preserve the public API
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="review" required>
        <QuestionnaireTitle>
          How should the work be reviewed?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose the checks the agent should complete before handoff.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="tests">
            Run the test suite
          </QuestionnaireChoice>
          <QuestionnaireChoice value="diff">
            Review the final diff
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            Tests and diff review
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireNavigation />
    </Questionnaire>
  ),
}

export const Shortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`shortcuts="letters"` assigns a keyboard key to each enabled choice, surfaced as letter badges and navigable without a mouse.',
      },
    },
  },
  render: () => (
    <Questionnaire
      className="mx-auto max-w-lg"
      items={questionnaireItems}
      defaultItem="direction"
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <SingleChoiceQuestions />
      <QuestionnaireNavigation />
    </Questionnaire>
  ),
}

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A required item marked `invalid` with a custom `QuestionnaireError` message, shown until a valid answer is selected.",
      },
    },
  },
  render: () => (
    <Questionnaire
      className="mx-auto max-w-lg"
      items={questionnaireItems.slice(0, 1)}
      defaultItem="direction"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="direction" required invalid>
        <QuestionnaireTitle>What should we prototype next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose a direction or write another answer.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span className="font-medium">Sub-agent delegation</span>
            <QuestionnaireChoiceDescription>
              Show when work is delegated and what comes back.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions">
            <span className="font-medium">Question prompts</span>
            <QuestionnaireChoiceDescription>
              Show choices while the agent waits for input.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            <span className="font-medium">Both together</span>
            <QuestionnaireChoiceDescription>
              Explore one unified interaction pattern.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError>
          Please choose a project direction.
        </QuestionnaireError>
      </QuestionnaireItem>
      <QuestionnaireNavigation />
    </Questionnaire>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Disabled choices and a disabled freeform input block interaction while preserving the visual layout.",
      },
    },
  },
  render: () => (
    <Questionnaire
      className="mx-auto max-w-lg"
      items={disabledItems}
      defaultItem="direction"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="direction" required>
        <QuestionnaireTitle>What should we prototype next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Some options are not available right now.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span className="font-medium">Sub-agent delegation</span>
            <QuestionnaireChoiceDescription>
              Show when work is delegated and what comes back.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions" disabled>
            <span className="font-medium">Question prompts</span>
            <QuestionnaireChoiceDescription>
              Disabled while the prompt engine is offline.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Another direction"
            placeholder="Type another direction…"
            disabled
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireNavigation />
    </Questionnaire>
  ),
}

export const CardComposition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Questionnaire composed with Card slots, rendering the title and description into the card header while keeping their semantic meaning.",
      },
    },
  },
  render: () => {
    const directionTitleId = React.useId()
    const signalsTitleId = React.useId()
    const timingTitleId = React.useId()

    return (
      <Questionnaire
        className="mx-auto max-w-lg"
        items={questionnaireItems}
        defaultItem="direction"
        shortcuts="numbers"
        onSubmit={handleSubmit}
      >
        <QuestionnaireItem
          aria-labelledby={directionTitleId}
          name="direction"
          required
        >
          <Card>
            <CardHeader>
              <QuestionnaireTitle id={directionTitleId} render={<CardTitle />}>
                What should we prototype next?
              </QuestionnaireTitle>
              <QuestionnaireDescription render={<CardDescription />}>
                Choose one direction or write another answer.
              </QuestionnaireDescription>
              <CardAction>
                <QuestionnaireProgress />
              </CardAction>
            </CardHeader>
            <CardContent>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="delegation">
                  <span className="font-medium">Sub-agent delegation</span>
                  <QuestionnaireChoiceDescription>
                    Show when work is delegated and what comes back.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireChoice value="questions">
                  <span className="font-medium">Question prompts</span>
                  <QuestionnaireChoiceDescription>
                    Show choices while the agent waits for input.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
                <QuestionnaireChoice value="both">
                  <span className="font-medium">Both together</span>
                  <QuestionnaireChoiceDescription>
                    Explore one unified interaction pattern.
                  </QuestionnaireChoiceDescription>
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </CardContent>
          </Card>
        </QuestionnaireItem>
        <QuestionnaireItem
          aria-labelledby={signalsTitleId}
          name="signals"
          multiple
        >
          <Card>
            <CardHeader>
              <QuestionnaireTitle id={signalsTitleId} render={<CardTitle />}>
                What should every progress update include?
              </QuestionnaireTitle>
              <QuestionnaireDescription render={<CardDescription />}>
                Select all that apply, or skip this question.
              </QuestionnaireDescription>
              <CardAction>
                <QuestionnaireProgress />
              </CardAction>
            </CardHeader>
            <CardContent>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="progress">
                  Progress
                </QuestionnaireChoice>
                <QuestionnaireChoice value="decisions">
                  Decisions
                </QuestionnaireChoice>
                <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </CardContent>
          </Card>
        </QuestionnaireItem>
        <QuestionnaireItem
          aria-labelledby={timingTitleId}
          name="timing"
          required
        >
          <Card>
            <CardHeader>
              <QuestionnaireTitle id={timingTitleId} render={<CardTitle />}>
                When should this be revisited?
              </QuestionnaireTitle>
              <QuestionnaireDescription render={<CardDescription />}>
                Choose when this should be revisited.
              </QuestionnaireDescription>
              <CardAction>
                <QuestionnaireProgress />
              </CardAction>
            </CardHeader>
            <CardContent>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="week">
                  This week
                </QuestionnaireChoice>
                <QuestionnaireChoice value="cycle">
                  Next cycle
                </QuestionnaireChoice>
                <QuestionnaireChoice value="later">
                  Revisit later
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </CardContent>
          </Card>
        </QuestionnaireItem>
        <QuestionnaireNavigation />
      </Questionnaire>
    )
  },
}

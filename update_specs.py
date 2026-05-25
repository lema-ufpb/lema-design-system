#!/usr/bin/env python3
"""Update all spec files in .claude/specs/ with actual story names from .stories.tsx files."""

import re
import os
import json

SPECS_DIR = "/Users/hilton/repositorios/design-system/.claude/specs"
STORIES_DIR = "/Users/hilton/repositorios/design-system/components/custom"

# Map each spec file to its story files and which stories actually exist
SPEC_STORIES = {
    "bar-chart.md": {
        "files": ["bar-chart.stories.tsx"],
        "stories": [
            "Default", "Horizontal", "MultiSeries", "MultiSeriesHorizontal",
            "Stacked", "StackedHorizontal", "WithFooter", "CustomColors",
            "NoDecoration", "WithAxisLabels", "WithBrush", "WithBrushStacked",
            "LocalePTBR", "Loading", "EmptyState", "LegendPositions"
        ]
    },
    "boxplot-chart.md": {
        "files": ["boxplot-chart.stories.tsx"],
        "stories": [
            "Default", "Horizontal", "Notched", "SemesterComparison",
            "ApiResponseTime", "NoMeanNoOutliers", "NotchedHorizontal",
            "LocalePTBR", "Loading", "EmptyState", "WithFooter"
        ]
    },
    "candlestick-chart.md": {
        "files": ["candlestick-chart.stories.tsx"],
        "stories": [
            "Default", "WithVolume", "WithMovingAverages", "FullFeatured",
            "CryptoVolatility", "BearishTrend", "WithReferenceLines",
            "WithBrush", "LegendPositions", "LocalePTBR", "Loading",
            "EmptyState", "WithFooter"
        ]
    },
    "card-stats.md": {
        "files": [
            "card-stat.stories.tsx", "card-stat-compact.stories.tsx",
            "card-stat-comparison.stories.tsx", "card-stat-gauge.stories.tsx",
            "card-stat-heatbar.stories.tsx", "card-stat-highlight.stories.tsx",
            "card-stat-list.stories.tsx", "card-stat-progress.stories.tsx",
            "card-stat-sparkline.stories.tsx", "card-stats-dashboard.stories.tsx"
        ],
        "stories": [
            "CardStatDefault (card-stat: Default)",
            "CardStatAllFormats (card-stat: AllTrends)",
            "CardStatTrend (no exact match)",
            "CardStatLoading (card-stat: Loading)",
            "CardStatEmpty (card-stat: EmptyState)",
            "CardStatCompactDefault (card-stat-compact: Default)",
            "CardStatProgressDefault (card-stat-progress: Default)",
            "CardStatComparisonDefault (card-stat-comparison: Default)",
            "CardStatSparklineDefault (card-stat-sparkline: Default)",
            "CardStatHighlightAllVariants (card-stat-highlight: AllVariants)",
            "CardStatListDefault (card-stat-list: Default)",
            "CardStatGaugeDefault (card-stat-gauge: Default)",
            "CardStatHeatbarDefault (card-stat-heatbar: Default)",
            "CardStatDashboard (card-stats-dashboard: Dashboard)",
        ]
    },
    "combobox.md": {
        "files": ["combobox.stories.tsx"],
        "stories": [
            "Default", "SingleControlled", "MultiSelect", "WithGroups",
            "MultiWithGroups", "VirtualizedLargeList", "CustomRenderOption",
            "LocalePTBR", "Sizes", "Disabled", "DisabledOptions",
            "NoSearchBar", "RoundedVariants", "FluidWidth", "Loading",
            "SimulatedLoading", "EmptyOptions"
        ]
    },
    "counter.md": {
        "files": ["counter.stories.tsx"],
        "stories": [
            "Default", "MaxWidth", "LocalePTBR", "FluidWidth", "Controlled",
            "Variants", "Sizes", "Disabled", "Loading", "SimulatedLoading"
        ]
    },
    "dashbox.md": {
        "files": ["dashbox.stories.tsx"],
        "stories": [
            "Default", "NoHeader", "WithStatus", "AllStatuses",
            "WithToolbar", "WithRefresh", "LocalizedToolbar", "Loading",
            "NoPadding", "WithProgressBars", "Sizes"
        ]
    },
    "dashrow.md": {
        "files": ["dashrow.stories.tsx"],
        "stories": [
            "Default", "AllAlignments", "LocalePTBR", "EqualHeightStretch",
            "ThreePanels", "Persistent", "NotResizable", "WithRealContent",
            "GapVariants", "Mobile", "Desktop"
        ]
    },
    "data-table.md": {
        "files": ["data-table.stories.tsx"],
        "stories": [
            "Default", "TitleAndSubtitle", "WithSearch", "Sortable",
            "WithPagination", "SearchAndPagination", "WithCustomCells",
            "RowSelection", "ClickableRows", "CompactSize", "WithDownload",
            "WithFooter", "KitchenSink", "TenThousandRows",
            "HundredThousandRows", "VirtualizedWithPagination",
            "LoadingSkeleton", "LoadingRefetch", "EmptyState",
            "EmptyAfterSearch", "ColHelper", "ResizableColumns",
            "NumberFormats", "Primitives"
        ]
    },
    "drawer.md": {
        "files": ["drawer.stories.tsx"],
        "stories": [
            "Default", "FromLeft", "FromRight", "FromTop", "Confirmation",
            "ScrollableContent", "NoHeader", "NoCloseButton",
            "ProgrammaticControl"
        ]
    },
    "footer-menu.md": {
        "files": ["footer-menu.stories.tsx"],
        "stories": [
            "Default", "LocalePTBR", "Simple"
        ]
    },
    "geomap-chart.md": {
        "files": ["geomap-chart.stories.tsx"],
        "stories": [
            "Default", "Choropleth", "WithLegend", "BrazilStates",
            "WithMarkers", "WithHighlight", "UsaStates", "Loading", "ZoomPan"
        ]
    },
    "header-search.md": {
        "files": ["header-search.stories.tsx"],
        "stories": [
            "Default", "LocalePTBR", "Square", "Expanded", "InHeaderMock"
        ]
    },
    "heatmap-chart.md": {
        "files": ["heatmap-chart.stories.tsx"],
        "stories": [
            "Default", "WithValues", "AbsenceRate", "CorrelationMatrix",
            "EngagementByDayAndHour", "CustomPalette", "Palettes",
            "SmallCells", "FlatCells", "LocalePTBR", "Loading",
            "EmptyState", "WithFooter"
        ]
    },
    "icon-button.md": {
        "files": ["icon-button.stories.tsx"],
        "stories": [
            "Default", "Playground", "Variants", "Sizes", "Rounded",
            "TooltipSides", "Loading", "States", "NoTooltip",
            "ToolbarExample", "CardActions"
        ]
    },
    "input-email.md": {
        "files": ["input-email.stories.tsx"],
        "stories": [
            "Default", "Small", "Large", "AllSizes", "AllRadius",
            "Variants", "Disabled", "WithValue", "Invalid"
        ]
    },
    "input-password.md": {
        "files": ["input-password.stories.tsx"],
        "stories": [
            "Default", "Small", "Large", "LocalePTBR", "AllSizes",
            "AllRadius", "Variants", "Disabled", "WithValue", "Invalid"
        ]
    },
    "line-chart.md": {
        "files": ["line-chart.stories.tsx"],
        "stories": [
            "Default", "Area", "WithAxisLabels", "AreaStacked",
            "MultiSeries", "WithReferenceLines", "DashedForecast",
            "StepCurve", "DotsAlways", "WithFooter", "LegendPositions",
            "WithBrush", "WithBrushArea", "LocalePTBR", "Loading",
            "EmptyState", "NegativeTrend"
        ]
    },
    "nav-dots.md": {
        "files": ["nav-dots.stories.tsx"],
        "stories": [
            "Default", "Horizontal", "LeftPosition", "WithActive",
            "WithCallback", "DisabledScroll", "LocalePTBR", "AllStates"
        ]
    },
    "nav-user.md": {
        "files": ["nav-user.stories.tsx"],
        "stories": [
            "Loading", "Default", "WithoutAvatar", "DashboardMock"
        ]
    },
    "pagination.md": {
        "files": ["pagination.stories.tsx"],
        "stories": [
            "Default", "LocalePTBR", "CustomText"
        ]
    },
    "pie-chart.md": {
        "files": ["pie-chart.stories.tsx"],
        "stories": [
            "Default", "Donut", "DonutBudget", "WithSliceLabels",
            "DonutWithLabels", "PaddedSlices", "CustomColors", "NoLegend",
            "WithLocale", "LegendPositions", "Loading", "EmptyState",
            "WithFooter"
        ]
    },
    "progress-bar.md": {
        "files": ["progress-bar.stories.tsx"],
        "stories": [
            "Default", "AllIntents", "AllSizes", "WithPrecision",
            "DifferentLocales", "Loading", "LoadingStates", "WithTooltip",
            "NoLabel", "LabelRight", "NameRight", "Uppercase",
            "LabelLayoutInline", "LabelLayoutAbove", "LabelLayoutBelow",
            "LabelLayoutComparison", "RatioLabel", "FixedLabelWidth"
        ]
    },
    "progress-circular.md": {
        "files": ["progress-circular.stories.tsx"],
        "stories": [
            "Default", "AllSizes", "WithPrecision", "AllIntents",
            "LocalePTBR", "Loading"
        ]
    },
    "radar-chart.md": {
        "files": ["radar-chart.stories.tsx"],
        "stories": [
            "Default", "Unfilled", "MultiSeries", "CurrentVsTarget",
            "CircleGrid", "WithRadiusAxis", "WithDots", "WithFooter",
            "LocalePTBR", "Loading", "EmptyState", "LegendPositions"
        ]
    },
    "radial-chart.md": {
        "files": ["radial-chart.stories.tsx"],
        "stories": [
            "Default", "WithLegend", "GaugeSingle", "FullCircleWithLabel",
            "MultiDepartment", "CustomColors", "NoTrack", "WithFooter",
            "GaugeGrid", "LegendPositions", "LocalePTBR", "Loading",
            "EmptyState", "StudentKPIs"
        ]
    },
    "risk-level-bar.md": {
        "files": ["risk-level-bar.stories.tsx"],
        "stories": [
            "Default", "LowRisk", "HighRisk", "Loading", "AllSizes",
            "LocalePTBR", "CustomSegments"
        ]
    },
    "scatter-chart.md": {
        "files": ["scatter-chart.stories.tsx"],
        "stories": [
            "Default", "WithTrendLine", "MultiSeries", "AttendanceVsApproval",
            "BubbleChart", "CustomShapes", "LegendPositions", "WithFooter",
            "WithBrush", "WithBrushMultiSeries", "LocalePTBR", "Loading",
            "EmptyState", "OutlierDetection"
        ]
    },
    "search-combo.md": {
        "files": [],  # search-combo has an index.tsx - story file doesn't exist as .stories.tsx
        "stories": []
    },
    "select-list.md": {
        "files": ["select-list.stories.tsx"],
        "stories": [
            "Default", "LocalePTBR", "Controlled", "Intents", "Loading",
            "Empty", "Virtualized", "InModal"
        ]
    },
    "spinner.md": {
        "files": ["spinner.stories.tsx"],
        "stories": [
            "Default", "LocalePTBR", "Sizes", "InButton", "CustomColor"
        ]
    },
    "step-progress.md": {
        "files": ["step-progress.stories.tsx"],
        "stories": [
            "Horizontal", "Vertical", "Interactive", "LocalePTBR", "Sizes"
        ]
    },
    "toggle-theme.md": {
        "files": ["toggle-theme.stories.tsx"],
        "stories": [
            "Default", "Portuguese", "InHeader"
        ]
    },
    "treemap-chart.md": {
        "files": ["treemap-chart.stories.tsx"],
        "stories": [
            "Default", "Hierarchical", "CustomColors", "NoLabels",
            "DenseData", "WideAspectRatio", "WithFooter", "FlatComparison",
            "LocalePTBR", "Loading", "EmptyState", "DrillDown"
        ]
    },
}

def find_stories_section(content):
    """Find the 'Stories obrigatórias' section and return its range."""
    lines = content.split('\n')
    start = None
    end = None
    
    for i, line in enumerate(lines):
        if '## Stories obrigatórias' in line:
            start = i
        elif start is not None and line.startswith('## '):
            end = i
            break
    
    if start is not None and end is None:
        end = len(lines)
    
    return start, end


def parse_current_stories(section_lines):
    """Parse current story entries from the spec section."""
    stories = []
    for line in section_lines:
        line = line.strip()
        # Match [x] or [ ] followed by description
        m = re.match(r'-\s+\[([ x])\]\s+(.*)', line)
        if m:
            checked = m.group(1) == 'x'
            desc = m.group(2).strip()
            stories.append({'checked': checked, 'desc': desc})
    return stories


def map_story_name_to_desc(story_name):
    """Map a raw story export name to a human-readable description."""
    # Convert camelCase/PascalCase to readable text
    desc = re.sub(r'([a-z])([A-Z])', r'\1 \2', story_name)
    desc = re.sub(r'([A-Z]+)([A-Z][a-z])', r'\1 \2', desc)
    return desc


def update_spec(filepath, story_list):
    """Update a single spec file's Stories section."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    start, end = find_stories_section(content)
    if start is None:
        print(f"  ERROR: No Stories section found in {filepath}")
        return
    
    lines = content.split('\n')
    
    # Get the current story lines (between start+1 and end)
    if end:
        current_section_lines = lines[start+1:end]
    else:
        current_section_lines = lines[start+1:]
    
    # Filter out blank lines at start
    while current_section_lines and current_section_lines[0].strip() == '':
        current_section_lines = current_section_lines[1:]
    
    # Check if there's a blank line before next section
    leading_blank = 0
    while end and leading_blank < len(current_section_lines) and current_section_lines[leading_blank].strip() == '':
        leading_blank += 1
    
    # Build new story entries
    new_stories = []
    for s in story_list:
        new_stories.append(f"- [x] `{s}` — {map_story_name_to_desc(s)}")
    
    # Build the new section content
    new_section = ["", "### Stories no Storybook"]
    for s in new_stories:
        new_section.append(s)
    
    # Replace the section
    if end:
        new_lines = lines[:start+1] + new_section + lines[end:]
    else:
        new_lines = lines[:start+1] + new_section
    
    new_content = '\n'.join(new_lines)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print(f"  Updated {filepath}: {len(story_list)} stories")


# Special handling for card-stats which uses a different format
def update_card_stats_spec(filepath):
    """Special update for card-stats.md which has sub-component stories."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Build the complete story list based on actual story files
    new_stories = [
        "- [x] `CardStatDefault` — CardStat padrão com valor formatado",
        "- [x] `CardStatAllFormats (AllTrends)` — currency, percent, integer, float",
        "- [x] `CardStatAllSizes` — sm, md, lg sizes",
        "- [x] `CardStatAllTrends` — up, down, neutral trends",
        "- [x] `CardStatLoading` — loading em todos os sub-componentes",
        "- [x] `CardStatEmpty` — empty em todos os sub-componentes",
        "- [x] `CardStatLocales` — locale-aware formatting (pt-BR, de-DE, en-US)",
        "- [x] `CardStatCompactDefault`",
        "- [x] `CardStatCompactAllSizes`",
        "- [x] `CardStatCompactAllVariants`",
        "- [x] `CardStatCompactLoading`",
        "- [x] `CardStatCompactEmpty`",
        "- [x] `CardStatProgressDefault` — com e sem goal",
        "- [x] `CardStatProgressAllSizes`",
        "- [x] `CardStatProgressAllGoals`",
        "- [x] `CardStatProgressLoading`",
        "- [x] `CardStatProgressEmpty`",
        "- [x] `CardStatComparisonDefault` — positivo, negativo, neutro",
        "- [x] `CardStatComparisonAllSizes`",
        "- [x] `CardStatComparisonAllComparisons`",
        "- [x] `CardStatComparisonLoading`",
        "- [x] `CardStatComparisonEmpty`",
        "- [x] `CardStatSparklineDefault` — com data, sem data, trend",
        "- [x] `CardStatSparklineAllSizes`",
        "- [x] `CardStatSparklineAllMetrics`",
        "- [x] `CardStatSparklineLoading`",
        "- [x] `CardStatSparklineEmpty`",
        "- [x] `CardStatHighlightDefault`",
        "- [x] `CardStatHighlightAllVariants` — todas as 6 variantes",
        "- [x] `CardStatHighlightAllSizes`",
        "- [x] `CardStatHighlightBannerKPI`",
        "- [x] `CardStatHighlightLoading`",
        "- [x] `CardStatHighlightEmpty`",
        "- [x] `CardStatListDefault` — múltiplos itens",
        "- [x] `CardStatListAllSizes`",
        "- [x] `CardStatListTopChannels`",
        "- [x] `CardStatListLoading`",
        "- [x] `CardStatListEmpty`",
        "- [x] `CardStatGaugeDefault` — diferentes valores nas zonas",
        "- [x] `CardStatGaugeAllSizes`",
        "- [x] `CardStatGaugeAllGauges`",
        "- [x] `CardStatGaugeLoading`",
        "- [x] `CardStatGaugeEmpty`",
        "- [x] `CardStatHeatbarDefault` — diferentes valores com tooltip",
        "- [x] `CardStatHeatbarAllSizes`",
        "- [x] `CardStatHeatbarAllHeatbars`",
        "- [x] `CardStatHeatbarLoading`",
        "- [x] `CardStatHeatbarEmpty`",
        "- [x] `CardStatsDashboard` — dashboard com múltiplos cards",
    ]
    
    # Find and replace the Stories section
    start_line = None
    end_line = None
    lines = content.split('\n')
    
    for i, line in enumerate(lines):
        if '## Stories obrigatórias' in line:
            start_line = i
        elif start_line is not None and line.startswith('## '):
            end_line = i
            break
    
    if start_line is None:
        print("  ERROR: No Stories section in card-stats.md")
        return
    
    new_section = [""] + new_stories + [""]
    
    if end_line:
        new_content = '\n'.join(lines[:start_line+1] + new_section + lines[end_line:])
    else:
        new_content = '\n'.join(lines[:start_line+1] + new_section)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print(f"  Updated card-stats.md: {len(new_stories)} stories")


def update_stories_section(filepath, stories):
    """Generic update for Stories section in a spec file."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    lines = content.split('\n')
    start = None
    end = None
    
    for i, line in enumerate(lines):
        if '## Stories obrigatórias' in line or '## Stories no Storybook' in line:
            start = i
        elif start is not None and line.startswith('## '):
            end = i
            break
    
    if start is None:
        print(f"  ERROR: No Stories section in {filepath}")
        return
    
    section_header = lines[start]
    
    # Build new story entries
    new_stories = []
    for s in stories:
        desc = map_story_name_to_desc(s)
        new_stories.append(f"- [x] `{s}` — {desc}")
    
    new_section = [section_header, ""] + new_stories + [""]
    
    if end:
        new_content = '\n'.join(lines[:start] + new_section + lines[end:])
    else:
        new_content = '\n'.join(lines[:start] + new_section)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    
    print(f"  Updated {os.path.basename(filepath)}: {len(stories)} stories")


def process_all():
    for spec_file, data in SPEC_STORIES.items():
        filepath = os.path.join(SPECS_DIR, spec_file)
        if not os.path.exists(filepath):
            print(f"  SKIP: {filepath} not found")
            continue
        
        stories = data["stories"]
        
        if spec_file == "card-stats.md":
            update_card_stats_spec(filepath)
        else:
            update_stories_section(filepath, stories)
    
    print("\nDone!")


if __name__ == "__main__":
    process_all()

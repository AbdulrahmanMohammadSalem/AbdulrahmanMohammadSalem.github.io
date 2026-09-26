---
title: SalDropDownList
excerpt: "A drop-down list control with better customization and behavioral capabilities."
date: 2026-09-26
order: 1
overlay_text: "1st"
badge: OOP_DotNet
---
---
# Overview

A custom Windows Forms drop-down list control built around the standard `System.Windows.Forms.ComboBox`. It provides a more customizable control surface while retaining the underlying ComboBox functionality for items, data binding, selection, searching, and drop-down behavior.

The control combines an internal `ComboBox` with a custom-drawn `Button`, allowing the visible control face, border, arrow, placeholder state, text alignment, colors, and drop-down item rendering to be customized independently. It also supports purpose-specific rendering for fonts and country lists, including font-specific text rendering and country flag images.

# Technologies Used

- **Language:** C#
- **Framework / UI:**
    - .NET Framework 4.8
    - Windows Forms
    - `System.Drawing` for custom rendering
- **Project Components:**
    - [`Salem.Drawing`](https://github.com/AbdulrahmanMohammadSalem/Salem/tree/MyMainBranch/Salem.Drawing) — drawing-related helpers and country flag resources
    - [`Salem.Utils`](https://github.com/AbdulrahmanMohammadSalem/Salem/tree/MyMainBranch/Salem.Utils) — utility functionality including localized predefined item collections
- **Project Configuration:**
    - Traditional MSBuild `.csproj` project targeting .NET Framework 4.8
    - Release XML documentation generation

# Features and Functionality

## ComboBox-Compatible Data and Selection
- The control exposes the main functionality of its internal `ComboBox`, including `Items`, `DataSource`, `DisplayMember`, `ValueMember`, `SelectedIndex`, `SelectedItem`, `Sorted`,`Text`, `DropDownWidth`, `DropDownHeight`, `MaxDropDownItems`, `FormattingEnabled`, `FormatString`,and `FormatInfo`.

- It also exposes searching through `FindString` and `FindStringExact`, item-height retrieval, display-text retrieval, and `BeginUpdate`/`EndUpdate` for controlling updates while modifying the item collection.

## Custom Control Appearance

- `SalDropDownList` adds appearance properties that are not provided in this form by the standard ComboBox:
    - Custom border color and thickness
    - Custom drop-down arrow color
    - Mouse-over and mouse-down background colors
    - Placeholder text and placeholder text color
    - Control-face text alignment
    - Control-face text padding
    - Custom drop-down item alignment
    - Configurable drop-down item height

- The visible button is custom painted to draw the border and a chevron-style drop-down arrow using the `Segoe Fluent Icons` font.

## Placeholder Behavior

- When no item is selected, the control displays configurable placeholder text such as `"Select"` and uses a separate placeholder text color.

- When an item becomes selected, the button instead displays the selected item's text and switches back to the control's foreground color.

## Purpose-Specific Item Collections

- The base class provides a `Purpose` property with predefined modes for:
    - Installed fonts
    - Countries
    - Paper sizes
    - Months
    - Days of the week

- Changing the purpose populates the underlying item collection using the corresponding helper methods. This occurs only at runtime giving you the freedom to change the `Purpose` property at design-time without actually populating the `Items` collection. This allows for better designer experience as the items specified at design-time aren't overriden immediately upon setting `Purpose`. This also makes the auto-generated code for the control shorter without cluttering it with item insertions and creating dedicated localized strings when working on a localized UI.

## Specialized Item Rendering

- The control uses `OwnerDrawVariable` mode for the internal ComboBox.

- For the `Fonts` purpose, each item can be rendered using a `Font` constructed from the item's name, allowing the font's name to be displayed using the font itself.

- For the `Countries` purpose, each item can be rendered with a country flag image alongside its text. The image and text rectangles are calculated separately so that the layout can be adjusted for left-to-right and right-to-left interfaces.

## Right-to-Left Support

- The drawing logic accounts for `RightToLeft` changes when determining text alignment, country flag placement, text placement relative to the flag, drop-down arrow placement, and button layout.

- The base class changes its drawing delegates when the `RightToLeft` property changes rather than using a single fixed layout.

## Events

- The custom control exposes events corresponding to important ComboBox operations, including `DropDown`, `DropDownClosed`, `SelectedIndexChanged`, `SelectionChangeCommitted`, and `TextUpdate`.

- These events are forwarded from the internal ComboBox through virtual event-raiser methods in the base class.

# Technical Implementation

## Composite Control Architecture

- Rather than deriving `SalDropDownList` directly from `ComboBox`, the implementation derives it from an abstract [`SalDropDownBase`](https://github.com/AbdulrahmanMohammadSalem/Salem/blob/MyMainBranch/Salem.Controls/SalDropDownBase.cs), which itself derives from `Control`.

- The base class owns two internal controls:
    - A `ComboBox` responsible for the actual list, selection, data binding, and drop-down functionality.
    - A `Button` responsible for the visible control face and custom interaction/rendering.

- `SalDropDownList` configures the internal ComboBox with `ComboBoxStyle.DropDownList` and makes the button the primary visible interaction surface. Clicking the button focuses the ComboBox and opens its drop-down.

- This separates the standard ComboBox functionality from the custom visual representation.

## Shared Base-Class Functionality

- `SalDropDownBase` contains functionality common to the drop-down control family, including:
    - ComboBox property forwarding
    - Event forwarding
    - Owner-drawn item rendering
    - Variable item-height handling
    - Purpose-specific item population
    - Right-to-left layout handling
    - Font-dependent dimension calculation
    - Resource cleanup

- The class is abstract and defines several abstract hooks such as `AdjustDimensions`, `InnerButton_Paint`, and handlers for internal ComboBox events. This allows derived controls to provide their own control-face behavior while reusing the common drop-down implementation.

## Owner-Drawn Variable-Height Items

- The internal ComboBox is initialized with `DrawMode = OwnerDrawVariable`, and the control implements both `DrawItem` and `MeasureItem`.

- `MeasureItem` obtains the active item height through a delegate. The implementation caches the normal ComboBox item height by temporarily switching to normal drawing mode, then restores owner-drawn mode.

- This provides two item-height modes:
    - `-1`: use the ComboBox's calculated default item height.
    - A non-negative value: use the explicitly configured height.

- Changing the configured height forces the ComboBox to transition between normal and owner-drawn modes so that measurement is recalculated.

## Purpose-Aware Rendering

- Rendering is selected according to the current `Purpose`. General items are drawn directly with `Graphics.DrawString`. Font items can instead construct a `System.Drawing.Font` using the item's text as the font family name. Country items can retrieve a corresponding flag image and render it beside the item text.

- The implementation therefore keeps the general rendering path simple while adding specialized paths only for purposes that require additional visual information.

## Custom Control-Face Rendering

- The button is not used merely as a standard button. Its `Paint` event is used to draw the visual representation of the drop-down control.

- The paint routine calculates the arrow and optional country-image regions, draws the configured border, optionally draws the selected country's flag, and finally renders a chevron character using the `Segoe Fluent Icons` font.

- This allows the button to act as the customizable visual shell around the underlying ComboBox.

## Dimension Management

- The control recalculates its height from the internal ComboBox's `PreferredHeight`. It also recalculates the cached image size used by the country-flag rendering.

- Dimension adjustment occurs when the control is created, resized, and when its font changes. This keeps the custom control face synchronized with the dimensions expected by the underlying ComboBox.

## Design-Time Integration

- The public properties contain Windows Forms design-time metadata such as `Category`, `Description`, `DefaultValue`, `Localizable`, `Browsable`, `Bindable`, and `DesignerSerializationVisibility`.

- Several ComboBox-related properties also reuse Windows Forms designer editors and converters for data members, item collections, and format strings.

- This allows the custom control to expose much of the familiar ComboBox configuration model through the Windows Forms designer rather than forcing all configuration to occur programmatically.

## Resource and Event Cleanup

- Both the base class and `SalDropDownList` override `Dispose`. The base class disposes its internal Button and ComboBox as well as the `SolidBrush` and `StringFormat` instances used during drawing. `SalDropDownList` also explicitly unsubscribes its event handlers before disposal.

# Summary

`SalDropDownList` is a composite WinForms control that extends the standard ComboBox model rather than replacing it. Its implementation separates the underlying list and data-binding behavior from a custom-painted control face, while an abstract base class centralizes common drop-down functionality such as owner-drawn rendering, variable item heights, purpose-specific item population, RTL layout, and event forwarding.

The most distinctive parts of the implementation are its owner-drawn font and country-list modes, custom control-face rendering, and the mechanism used to retain the ComboBox's default item sizing while supporting variable-height custom rendering.

# How to Use

- Compile the source code into a DLL and add that as reference in your project.

# Source Code

- *The source code is divided into multiple files across different class libraries in the* ***[Salem](https://github.com/AbdulrahmanMohammadSalem/Salem/)*** *repository.*
- *You can find the source for `SalDropDownBase` [here](https://github.com/AbdulrahmanMohammadSalem/Salem/blob/MyMainBranch/Salem.Controls/SalDropDownBase.cs), and `SalDropDownList` [here](https://github.com/AbdulrahmanMohammadSalem/Salem/blob/MyMainBranch/Salem.Controls/SalDropDownList.cs).*
- *Any other dependencies can be found in the* ***Salem*** *repository on GitHub.*
---
title: SalDropDownEdit
excerpt: "An editable drop-down list control with better customization and behavioral capabilities."
date: 2026-09-26
order: 2
overlay_text: "2nd"
badge: OOP_DotNet
---
---
# Overview

A custom Windows Forms editable drop-down control built on the shared [`SalDropDownBase`](https://github.com/AbdulrahmanMohammadSalem/Salem/blob/MyMainBranch/Salem.Controls/SalDropDownBase.cs) infrastructure and an internal `System.Windows.Forms.ComboBox`.

Unlike [`SalDropDownList`](https://AbdulrahmanMohammadSalem.github.io/CsWinFormsControls/SalDropDownList/), which uses the ComboBox's non-editable `DropDownList` style, `SalDropDownEdit` retains the editable text portion of the ComboBox. It therefore supports direct text entry, text selection, maximum input length, and Windows Forms auto-completion while providing a separately customizable drop-down button and control appearance.

The control combines an internal editable ComboBox with a custom Button, allowing the drop-down button, border, arrow, hover states, RTL layout, and other visual details to be controlled independently of the text-editing functionality.

# Technologies Used

- **Language:** C#
- **Framework / UI:**
    - .NET Framework 4.8
    - Windows Forms
    - `System.Drawing` for custom rendering
- **Project Components:**
    - [`Salem.Drawing`](https://github.com/AbdulrahmanMohammadSalem/Salem/tree/MyMainBranch/Salem.Drawing) — drawing helpers used for the custom border and arrow rendering
- **Project Configuration:**
    - Traditional MSBuild `.csproj` project targeting .NET Framework 4.8
    - Release XML documentation generation

# Features and Functionality

## Editable ComboBox Behavior

- The control retains the editable text-entry behavior of the underlying ComboBox and exposes properties for `Text`, `MaxLength`, `SelectionStart`, `SelectionLength`, and `Focused`.

- It also provides `Select`, `SelectAll`, and `Focus` methods for controlling the editable portion programmatically.

## Auto-Completion

- The control exposes the standard Windows Forms ComboBox auto-completion configuration: `AutoCompleteMode`, `AutoCompleteSource`, and `AutoCompleteCustomSource`.

- This allows the editable text box to provide suggestions or automatic text completion using the sources supported by the underlying ComboBox.

## ComboBox Data and Selection

- Through `SalDropDownBase`, the control also retains ComboBox-oriented functionality including `Items`, `DataSource`, `DisplayMember`, `ValueMember`, `SelectedIndex`, `SelectedItem`, `Sorted`, `DropDownWidth`, `DropDownHeight`, `MaxDropDownItems`, `FormattingEnabled`, `FormatString`, `FormatInfo`, `FindString`, and `FindStringExact`.

## Custom Drop-Down Appearance

- The drop-down button provides configurable:
    - Border color
    - Arrow color
    - Mouse-over background color
    - Mouse-down background color
    - Optional separator on mouse-over

- The button is custom painted and uses a chevron character from the `Segoe Fluent Icons` font for the drop-down arrow.

## Right-to-Left Support

- The control adapts its layout when `RightToLeft` is set to `Yes`.

- The drop-down button moves to the opposite side of the control, the internal ComboBox receives the same RTL setting, and the custom button painting adjusts its border and arrow geometry accordingly.

## Shared Specialized Drop-Down Rendering

- Because `SalDropDownEdit` derives from `SalDropDownBase`, it also inherits the base control's purpose-based item functionality.

- The available purposes include:
    - Installed fonts
    - Countries
    - Paper sizes
    - Months
    - Days of the week

- The corresponding owner-drawn rendering behavior, including font-specific rendering and country flag images, is provided by the base class.

## Events

- The control forwards important ComboBox events through the shared base class, including `DropDown`, `DropDownClosed`, `SelectedIndexChanged`, `SelectionChangeCommitted`, and `TextUpdate`.

- It also forwards the internal ComboBox's `TextChanged` event through the normal `Control.OnTextChanged` mechanism.

# Technical Implementation

## Composite Control Architecture

- `SalDropDownEdit` derives from `SalDropDownBase`, which derives from `Control`.

- The base class owns:
    - An internal `ComboBox`, which provides text editing, selection, data binding, auto-completion, and drop-down behavior.
    - An internal `Button`, which provides the separately rendered drop-down interaction surface.

- `SalDropDownEdit` leaves the ComboBox editable and connects its events to the base-class event infrastructure. Clicking the custom button focuses the ComboBox and sets its `DroppedDown` state to `true`.

## Editable ComboBox Integration

- The control does not implement its own text-editing system. Instead, properties such as `MaxLength`, `SelectionStart`, `SelectionLength`, and the auto-completion settings are directly forwarded to the internal ComboBox.

- This keeps text editing and auto-completion behavior within the Windows Forms ComboBox implementation while allowing the surrounding control to customize its appearance.

## Custom Button Rendering

- The drop-down button is configured as a flat button and custom painted through its `Paint` event.

- The painting routine:
    1. Draws the appropriate border edges.
    2. Optionally draws a separator when the mouse is hovering over the button.
    3. Creates a brush using the configured arrow color.
    4. Draws the chevron character using the button's `Segoe Fluent Icons` font.
    5. Adjusts the geometry when the control is using RTL layout.

- The button's hover state is tracked separately so that the optional separator can be displayed only while the pointer is over the button.

## Control Geometry

- `AdjustDimensions` controls the relationship between the internal ComboBox and the custom button.

- The button width is enforced at either 26 or 27 pixels depending on whether the hover separator is enabled. The internal ComboBox receives a custom `Region` that leaves room for the button and the surrounding border.

- The control's height is then synchronized with the internal ComboBox's height, and the region is explicitly disposed and replaced when dimensions are recalculated.

## Right-to-Left Layout

- RTL support affects both the child-control arrangement and custom drawing. When RTL is enabled:
    - The button is docked to the left.
    - The internal ComboBox receives `RightToLeft.Yes`.
    - The ComboBox region is positioned differently.
    - The button border is drawn in the opposite direction.
    - The arrow's drawing rectangle is adjusted.

- This keeps the editable area and drop-down button consistent with the selected reading direction.

## Design-Time Integration

- The control exposes Windows Forms design-time metadata for its configurable properties, including categories, descriptions, default values, localization support, and designer serialization behavior.

- The custom auto-complete string collection also uses the standard Windows Forms collection editor, allowing it to be configured through the designer.

## Resource and Event Cleanup

- `Dispose` explicitly removes the event handlers registered by `SalDropDownEdit` before delegating to the base implementation.

- The base class is then responsible for disposing its internal controls and drawing resources.

# Notable Engineering Details

## Editable Behavior Remains Native to ComboBox

Rather than reproducing text editing, selection, and auto-completion logic, the control exposes those capabilities directly from its internal ComboBox.

This keeps the custom implementation focused on the visual shell and integration layer while retaining the framework's existing editable ComboBox behavior.

## Separate Button as the Drop-Down Interaction Surface

The drop-down button is an independent child control rather than part of the ComboBox's standard visual presentation.

This provides direct control over its width, hover and pressed backgrounds, arrow rendering, border behavior, and RTL positioning.

## Custom ComboBox Region

The internal ComboBox's `Region` is recalculated to accommodate the custom button and surrounding control geometry. This allows the editable area to coexist with the separately docked button without requiring a completely custom text-editing implementation.

## Optional Hover Separator

`ShowSeparatorOnMouseOver` changes both the button width and its painting behavior. When enabled, the button becomes one pixel wider and draws a separator line only while the pointer is over the button.

The dimension logic is also reapplied during `AdjustDimensions`, ensuring the configured width is restored when the control is recalculated.

## Shared Drop-Down Infrastructure

The editable control reuses `SalDropDownBase` for the functionality common to the drop-down control family: ComboBox property forwarding, event forwarding, owner-drawn items, variable item heights, purpose-specific collections, and RTL-aware item rendering.

`SalDropDownEdit` therefore concentrates its implementation specifically on the editable control face and text-entry-specific behavior.

# Summary

`SalDropDownEdit` is a composite WinForms control that combines an editable `ComboBox` with a separately controlled drop-down button.

Its implementation preserves native ComboBox functionality for text entry, selection, data binding, searching, and auto-completion while adding custom rendering for the button, border, arrow, hover behavior, and RTL layout.

The control's main technical distinction is the separation between the editable ComboBox functionality and the custom visual drop-down surface, with the shared `SalDropDownBase` providing the common infrastructure for item rendering, sizing, purpose-specific lists, and event forwarding.

# How to Use

- Compile the source code into a DLL and add that as reference in your project.

# Source Code

- *The source code is divided into multiple files across different class libraries in the* ***[Salem](https://github.com/AbdulrahmanMohammadSalem/Salem/)*** *repository.*
- *You can find the source for `SalDropDownBase` [here](https://github.com/AbdulrahmanMohammadSalem/Salem/blob/MyMainBranch/Salem.Controls/SalDropDownBase.cs), and `SalDropDownEdit` [here](https://github.com/AbdulrahmanMohammadSalem/Salem/blob/MyMainBranch/Salem.Controls/SalDropDownEdit.cs).*
- *Any other dependencies can be found in the* ***Salem*** *repository on GitHub.*

# Requirement Analysis

## Scope

The document covers the publicly accessible functionality observed on these Magicbricks pages:

- Buy vs Rent Calculator: https://www.magicbricks.com/advice/buy-rent-calculator-financial-advice
- Hyderabad property discovery page: https://www.magicbricks.com/property-for-sale-rent-in-Hyderabad/residential-real-estate-Hyderabad

The Hyderabad URL was supplied twice and is treated as one feature area. The calculator exposes `Property`, `Loan`, and `Tax` tabs. The accessible page confirmed the tab labels, but the detailed Loan and Tax controls were not exposed in the captured initial UI; therefore those cases verify tab availability and observable content without inventing field names or formulas.

## Confirmed Functional Areas

| Area | Confirmed behavior |
| --- | --- |
| Calculator - Property | Property Price, Status, Years to Possession, Expected Property Appreciation, Current Rent, and Monthly Gross Salary are displayed with default values. |
| Calculator - Results | The page displays a buy-versus-rent recommendation, Buying Cost, Renting Cost, and an annual savings chart by years from today. |
| Calculator - Tabs | `Property`, `Loan`, and `Tax` tabs are visible. |
| Hyderabad search | Buy and Rent modes, city/locality/project search, Property Type, Budget, and Search controls are visible. |
| Hyderabad results | Property cards display BHK type, price, optional area, locality, possession status, and View Details. |
| Hyderabad navigation | New Projects, Owner Properties, Projects, Budget Homes, and property-card View Details links are visible. |

## Assumptions and Exclusions

- Expected validation wording and exact Loan/Tax inputs must be confirmed when those tabs are fully interactive.
- Property results are dynamic and may change between executions; tests should validate structure and consistency rather than fixed listing order.
- Login, signup, OTP, account creation, and authentication-only actions are excluded. The visible Login link is not tested as a standalone case.

# Detailed Written Test Cases

## TC01 - Verify the default Buy vs Rent Property calculation

**Feature:** Buy vs Rent Calculator - Property tab  
**Priority:** High  
**Test Type:** Functional, Calculation, Positive

### Preconditions

1. The Buy vs Rent Calculator page is available.
2. The Property tab is selected.

### Test Data

| Field | Value observed on page |
| --- | --- |
| Property Price | 40 Lac |
| Status | Under Construction |
| Years to Possession | 3 Years |
| Expected Property Appreciation | 10% |
| Current Rent | 20,000 |
| Monthly Gross Salary | 50,000 |

### Steps

1. Open the calculator page.
2. Confirm the Property tab and the six Property inputs are displayed.
3. Retain the visible default values.
4. Review the displayed recommendation, Buying Cost, Renting Cost, and annual savings chart.

### Expected Result

The calculator displays a recommendation based on the entered values, with Buying Cost, Renting Cost, and a year-based savings visualization. The result is populated and internally consistent with the supplied inputs.

## TC02 - Verify recalculation and input validation for Property values

**Feature:** Buy vs Rent Calculator - Property tab  
**Priority:** High  
**Test Type:** Positive, Negative, Validation, Boundary

### Preconditions

1. The Property tab is open.
2. The calculator has loaded its default result.

### Test Data

| Field | Test value |
| --- | --- |
| Property Price | 80 Lac, then blank/invalid text |
| Current Rent | 40,000 |
| Expected Property Appreciation | 0% |
| Years to Possession | 0 |

### Steps

1. Change Property Price from 40 Lac to 80 Lac using the visible input/slider control.
2. Change Current Rent to 40,000.
3. Set Expected Property Appreciation to 0% and Years to Possession to 0 where the controls allow it.
4. Observe whether the recommendation, costs, or chart update.
5. Clear one numeric input or enter a non-numeric value if the control permits text entry.

### Expected Result

Valid changes update the calculated output without breaking the page. Zero values are handled according to the business rule. Empty or invalid numeric input is rejected or produces a clear validation response; the page must not display a misleading calculated result.

## TC03 - Verify access to the Loan calculator tab

**Feature:** Buy vs Rent Calculator - Loan tab  
**Priority:** High  
**Test Type:** Functional, UI

### Preconditions

1. The Buy vs Rent Calculator page is loaded.
2. No login or OTP is required.

### Test Data

| Field | Value |
| --- | --- |
| Tab | Loan |
| Existing context | Property values remain at their visible defaults |

### Steps

1. Select the `Loan` tab.
2. Confirm that the selected tab is visually distinguishable.
3. Inspect the content shown for the Loan tab.
4. If Loan inputs are displayed, enter valid values and activate the available calculation/update control.

### Expected Result

The Loan tab can be selected without an error, and its relevant loan content is displayed. Any visible loan result updates from valid inputs. Exact loan fields, formulas, and boundary values are to be confirmed from the fully interactive tab.

## TC04 - Verify access to the Tax calculator tab and safe handling of invalid input

**Feature:** Buy vs Rent Calculator - Tax tab  
**Priority:** High  
**Test Type:** Functional, Negative, Validation

### Preconditions

1. The Buy vs Rent Calculator page is loaded.
2. The calculator is accessible without authentication.

### Test Data

| Field | Value |
| --- | --- |
| Tab | Tax |
| Invalid input, if a numeric field is shown | Alphabetic characters or a blank value |

### Steps

1. Select the `Tax` tab.
2. Confirm that the selected tab is visually distinguishable.
3. Inspect the displayed tax inputs and output area.
4. If an editable numeric tax field is available, leave it blank or enter alphabetic characters.
5. Trigger the available calculation or update action.

### Expected Result

The Tax tab opens without a navigation or script error. If invalid or missing input is entered, the page shows a validation response or prevents calculation; it must not present an unqualified tax result based on invalid data. Exact tax rules and formula are to be confirmed from the interactive tab.

## TC05 - Verify Hyderabad Buy search with a locality query

**Feature:** Hyderabad property discovery search  
**Priority:** High  
**Test Type:** Functional, Positive, Navigation

### Preconditions

1. The Hyderabad property page is loaded.
2. The Buy mode is selected or available.

### Test Data

| Field | Value |
| --- | --- |
| Search query | Kondapur, Hyderabad |
| Mode | Buy |

### Steps

1. Select Buy mode.
2. Enter `Kondapur, Hyderabad` in `Enter City, Locality, Project`.
3. Select the matching suggestion if suggestions are displayed.
4. Click Search.

### Expected Result

The search executes successfully and the resulting page or result section is for the requested Hyderabad locality and selected Buy mode. The result area remains usable even if the live inventory changes.

## TC06 - Verify Property Type and Budget controls on the Hyderabad page

**Feature:** Hyderabad property discovery filters  
**Priority:** High  
**Test Type:** Functional, UI, Validation

### Preconditions

1. The Hyderabad property page is loaded.
2. The search area is visible.

### Test Data

| Control | Value |
| --- | --- |
| Property Type | Select any meaningful available residential type |
| Budget | Select any meaningful available budget range |
| Search query | Hyderabad |

### Steps

1. Open the Property Type control and select a valid available option.
2. Open the Budget control and select a valid available range.
3. Enter or retain Hyderabad in the location search field.
4. Click Search.
5. Inspect the returned property cards.

### Expected Result

The selected Property Type and Budget values remain applied after search. Returned cards are residential property results compatible with the selected criteria where inventory exists. The controls close or update correctly and do not overlap or lose the selected values.

## TC07 - Verify Hyderabad property-card details and navigation

**Feature:** Hyderabad property discovery results  
**Priority:** Medium  
**Test Type:** Functional, Navigation, UI

### Preconditions

1. The Hyderabad page has loaded property cards.
2. At least one visible card contains a BHK type, price, locality, possession status, and View Details action.

### Test Data

| Property card | Example observed value |
| --- | --- |
| Card type | 4 BHK Flat |
| Price | ₹2.39 Cr |
| Locality | Kondapur, Hyderabad |
| Status | Under Construction |

### Steps

1. Review several visible cards, including cards with different BHK types or Ready to Move/Under Construction statuses.
2. Confirm that each card shows its property type and price, and where provided, area and locality.
3. Select View Details on one card.
4. Observe the destination page or detail view.
5. Return to the Hyderabad results page.

### Expected Result

Property cards present readable and consistent property information. View Details opens the corresponding property detail experience rather than an unrelated page or broken destination. Returning to the results page is possible without an unexpected authentication requirement.

## Coverage Summary

| Coverage Area | Covered? | Test Case IDs |
| --- | --- | --- |
| Positive Testing | Yes | TC01, TC03, TC05, TC07 |
| Negative Testing | Yes | TC02, TC04 |
| Boundary Testing | Yes, for visible zero values | TC02 |
| Input Validation | Yes | TC02, TC04, TC06 |
| Dropdown/Selection Testing | Yes | TC06 |
| Calculation Testing | Yes | TC01, TC02 |
| Reset/Clear | Partially applicable; clearing input is covered, no dedicated Reset control was confirmed | TC02 |
| Navigation | Yes | TC05, TC07 |
| UI Behavior | Yes | TC03, TC04, TC06, TC07 |
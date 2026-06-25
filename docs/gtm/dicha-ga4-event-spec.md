# Dicha GA4/GTM Event Spec

Date: 2026-06-25

## IDs

- GTM Container ID: `GTM-MZ49S52B`
- GA4 Measurement ID: `G-WR772CRB4Q`

## Shared Context

Send these fields on all major events.

| Parameter | Type | Notes |
| --- | --- | --- |
| `user_id` | string | Internal member id only. Do not send email, phone, or name. |
| `login_status` | string | `anonymous` or `member` |
| `user_tier` | string | `Member`, `Silver`, `Gold`, `Black` |
| `is_subscription_active` | boolean | First phase uses this only as a behavior segment. |
| `orderer_type` | string | `member` or `guest`, where applicable |

Send `user_context_set` separately when login/session/subscription context is known.

```json
{
  "event": "user_context_set",
  "user_id": "123",
  "login_status": "member",
  "user_tier": "Gold",
  "is_subscription_active": true
}
```

## Search

Send only when:

- Search result loading has completed.
- Search term length is at least 2.
- The same term has not already been sent during the current page stay.
- Email-like or phone-like values are replaced with `[redacted]`.

```json
{
  "event": "search",
  "search_term": "에티오피아",
  "result_count": 3
}
```

## Home Sections

Allowed `section_name` values:

- `hero`
- `quick_links`
- `best_products`
- `roaster_pick`
- `story`
- `review`
- `bottom_tab`
- `header`

Home product clicks should send both:

- `home_section_click` for section contribution
- `select_item` for ecommerce item selection

## Ecommerce Events

Use GA4 recommended ecommerce event names when possible.

| Event | When |
| --- | --- |
| `view_item_list` | Product list, search results, or home product section is shown |
| `select_item` | Product card/tile is clicked |
| `view_item` | Product detail page is viewed |
| `add_to_cart` | Add-to-cart succeeds |
| `remove_from_cart` | Cart item is removed |
| `view_cart` | Cart page is viewed |
| `begin_checkout` | Purchase page is entered with checkout items |
| `add_shipping_info` | Shipping address is selected or auto-applied |
| `add_payment_info` | Payment method is selected |
| `order_created` | Order API succeeds |
| `guest_order_created` | Guest order API succeeds |
| `purchase` | For now, order API succeeds. After real payment is attached, move this to payment success. |

Common ecommerce parameters:

| Parameter | Type | Notes |
| --- | --- | --- |
| `currency` | string | Use `KRW` |
| `value` | number | Total event value |
| `shipping` | number | Shipping fee, purchase only |
| `transaction_id` | string | Order number |
| `payment_type` | string | `account`, `kakao-pay`, `credit-card` |
| `payment_status` | string | Current phase can use `order_created` or `pending` |
| `checkout_mode` | string | `cart` or `direct` |
| `item_list_name` | string | Examples: `product_list`, `search_results`, `home_best_products`, `home_roaster_pick` |
| `items` | array | GA4 ecommerce items |

Recommended item shape:

```json
{
  "item_id": "1",
  "item_name": "에티오피아 예가체프",
  "item_category": "원두",
  "item_variant": "라이트 · 핸드드립 분쇄 · 200g",
  "price": 18000,
  "quantity": 1
}
```

Guest order success sends all three events:

```txt
order_created
guest_order_created
purchase
```

## Taste Test

Send an answer event for every question, using code values rather than display labels.

```json
{
  "event": "taste_test_answer",
  "question_id": "beginner_flavor",
  "question_key": "beginnerFlavor",
  "answer_value": "FRUITY",
  "step_index": 4
}
```

Send completion when the API result has arrived.

```json
{
  "event": "taste_test_complete",
  "acidity": 4,
  "body": 2,
  "sweetness": 3,
  "primary_flavor_note": "FRUITY",
  "recommended_item_ids": ["1", "4", "8"]
}
```

## GTM Import Notes

The companion JSON file `dicha-ga4-container-import.json` is designed to be imported into the existing `GTM-MZ49S52B` container. It creates:

- A constant variable for `G-WR772CRB4Q`
- Data Layer Variables for the agreed parameters
- One Custom Event trigger matching the agreed event names
- One GA4 Event router tag that forwards the dataLayer event name and mapped parameters to GA4

After import, use GTM Preview and GA4 DebugView before publishing.

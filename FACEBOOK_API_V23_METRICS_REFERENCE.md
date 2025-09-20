# Facebook Graph API v23.0 Insights Metrics Reference

**API Version:** v23.0  
**Last Updated:** September 19, 2025

This document provides a comprehensive reference for all Facebook Graph API v23.0 Insights metrics available through the MCP server.

## Page-Level Metrics

### Page Content & Tab Views

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_tab_views_login_top_unique` | Number of logged-in people who viewed Page tabs | day, week | Integer | By tab type breakdown |
| `page_tab_views_login_top` | Total Page tab views by logged-in users | day, week | Integer | Includes repeat views |
| `page_tab_views_logout_top` | Total Page tab views by logged-out users | day, week | Integer | Anonymous tab views |

### Page CTA & Actions

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_cta_clicks_logged_in_total` | Total CTA clicks by logged-in users | day, week, days_28 | Integer | All CTA types |
| `page_cta_clicks_logged_in_unique` | Unique CTA clicks by logged-in users | day, week, days_28 | Integer | Unique users |

### Page Engagement

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_follows` | Number of new Page follows | day, week, days_28 | Integer | New followers |
| `page_unfollows` | Number of Page unfollows | day, week, days_28 | Integer | Lost followers |
| `page_engaged_users` | Number of people who engaged with Page | day, week, days_28 | Integer | Any engagement |

### Page Impressions

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_impressions` | Total Page impressions | day, week, days_28 | Integer | All impressions |
| `page_impressions_unique` | Number of people who had Page content enter their screen | day, week, days_28 | Integer | Estimated metric |
| `page_impressions_paid` | Paid Page impressions | day, week, days_28 | Integer | Promoted content |
| `page_impressions_organic` | Organic Page impressions | day, week, days_28 | Integer | Non-promoted content |

### Page Posts Impressions

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_posts_impressions` | Total Page posts impressions | day, week, days_28 | Integer | All posts |
| `page_posts_impressions_unique` | Unique Page posts impressions | day, week, days_28 | Integer | Unique people |

### Page Video Performance

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_video_views` | Total Page video views | day, week, days_28 | Integer | All video views |
| `page_video_views_unique` | Unique Page video views | day, week, days_28 | Integer | Unique viewers |
| `page_video_views_autoplayed` | Autoplayed video views | day, week, days_28 | Integer | Auto-played content |

### Page Fan/Demographics

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_fan_adds` | New Page fans | day, week, days_28 | Integer | New followers |
| `page_fan_removes` | Removed Page fans | day, week, days_28 | Integer | Unfollows |

### Page Content & Views

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_views` | Total Page profile views | day, week, days_28 | Integer | Profile visits |
| `page_views_unique` | Unique Page profile views | day, week, days_28 | Integer | Unique visitors |

### Page Stories & Activity

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `page_stories` | Page stories created | day, week, days_28 | Integer | Story posts |
| `page_activity` | Page activity score | day, week, days_28 | Integer | Engagement metric |

## Post-Level Metrics

### Post Impressions

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `post_impressions` | Total post impressions | day, week, days_28 | Integer | All impressions |
| `post_impressions_unique` | Unique post impressions | day, week, days_28 | Integer | Unique people |
| `post_impressions_paid` | Paid post impressions | day, week, days_28 | Integer | Promoted posts |
| `post_impressions_organic` | Organic post impressions | day, week, days_28 | Integer | Non-promoted posts |

### Post Engagement & Activity

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `post_engaged_users` | People who engaged with post | day, week, days_28 | Integer | Any engagement |
| `post_clicks` | Total post clicks | day, week, days_28 | Integer | All clicks |
| `post_reactions_by_type_total` | Total reactions by type | day, week, days_28 | JSON | Reaction breakdown |

### Post Reactions

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `post_reactions_like_total` | Total likes | day, week, days_28 | Integer | Like reactions |
| `post_reactions_love_total` | Total loves | day, week, days_28 | Integer | Love reactions |
| `post_reactions_wow_total` | Total wows | day, week, days_28 | Integer | Wow reactions |
| `post_reactions_haha_total` | Total hahas | day, week, days_28 | Integer | Haha reactions |
| `post_reactions_sorry_total` | Total sorrys | day, week, days_28 | Integer | Sorry reactions |
| `post_reactions_anger_total` | Total angers | day, week, days_28 | Integer | Anger reactions |

### Post Video Performance

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `post_video_views` | Post video views | day, week, days_28 | Integer | Video views |
| `post_video_views_unique` | Unique post video views | day, week, days_28 | Integer | Unique viewers |
| `post_video_views_autoplayed` | Autoplayed post video views | day, week, days_28 | Integer | Auto-played |

## Video Metrics

### Video Views & Completion

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `video_views` | Total video views | day, week, days_28 | Integer | All views |
| `video_views_unique` | Unique video views | day, week, days_28 | Integer | Unique viewers |
| `video_views_autoplayed` | Autoplayed video views | day, week, days_28 | Integer | Auto-played |
| `video_views_clicked_to_play` | Clicked-to-play video views | day, week, days_28 | Integer | User-initiated |
| `video_views_organic` | Organic video views | day, week, days_28 | Integer | Non-promoted |
| `video_views_paid` | Paid video views | day, week, days_28 | Integer | Promoted content |

### Video Completion & Retention

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `video_complete_views` | Complete video views | day, week, days_28 | Integer | 100% completion |
| `video_30_sec_views` | 30-second video views | day, week, days_28 | Integer | 30+ seconds |
| `video_avg_time_watched` | Average time watched | day, week, days_28 | Float | In seconds |
| `video_retention_curve` | Video retention curve | day, week, days_28 | JSON | Retention data |

### Video Demographics

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `video_views_by_age_gender` | Video views by age and gender | day, week, days_28 | JSON | Demographic breakdown |
| `video_views_by_country` | Video views by country | day, week, days_28 | JSON | Geographic breakdown |
| `video_views_by_locale` | Video views by locale | day, week, days_28 | JSON | Language breakdown |

### Video Attribution

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `video_views_by_distribution_type` | Video views by distribution | day, week, days_28 | JSON | Organic vs paid |
| `video_views_by_placement` | Video views by placement | day, week, days_28 | JSON | Feed, stories, etc. |

## Monetization Metrics

### Content Monetization

| Metric Name | Description | Periods | Data Type | Notes |
|-------------|-------------|---------|-----------|-------|
| `content_creator_earnings` | Creator earnings | day, week, days_28 | Float | USD earnings |
| `content_creator_earnings_breakdown` | Earnings breakdown | day, week, days_28 | JSON | Detailed breakdown |
| `content_monetization_metrics` | Monetization metrics | day, week, days_28 | JSON | Various metrics |

## Data Types

- **Integer**: Counts, totals, and whole numbers
- **Float**: Earnings, rates, and decimal values  
- **JSON**: Complex objects with breakdowns (demographics, attribution)
- **String**: Text-based data

## Supported Periods

- **day**: Daily data points
- **week**: Weekly aggregated data
- **days_28**: 28-day rolling periods
- **month**: Monthly data
- **lifetime**: All-time totals since Page creation

## Usage Notes

- All metrics are based on Facebook Graph API v23.0
- Some metrics are estimated and may not be 100% accurate
- Deprecated metrics are excluded from this reference
- For the most up-to-date information, refer to the official Facebook Graph API documentation

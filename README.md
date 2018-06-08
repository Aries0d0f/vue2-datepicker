# vue2-datepicker

A responsive date range picker for Vue.js, support RWD.

[Live Demo](http://demo.aries0d0f.me)

![Imgur](https://i.imgur.com/29CGRbz.png)

## Requirements
- [Vue.js](https://vuejs.org) `^2.0.0`

## Installation

using npm:
```bash
$ npm install @aries0d0f/vue2-datepicker
```

using CDN:
```html
<script src="https://unpkg.com/@aries0d0f/vue2-datepicker/dist/vue-datepicker.min.js"></script>
```

## Usage

Interanl
```javascript
import VueDatepicker from '@aries0d0f/vue2-datepicker'

export default {
  components: {
    VueDatepicker
  }
}
```
```html
<vue-datepicker />
```

Global
```
import VueDatepicker from '@aries0d0f/vue2-datepicker'

Vue.use(VueDatepicker)
```

## Props/Options

### singleDateSelection

- Type: `Boolean`
- Default: `false`

Choose only one date, not a range.

```html
<vue-datepicker :singleDateSelection="true" v-model="date" />
```

![Imgur](https://i.imgur.com/G7sYaPJ.png)

### format

- Type: `String`
- Default: `YYYY-MM-DD`

The date format string.

```html
<vue-datepicker :format="YYYY/MM/DD" v-model="date" />
```

![Imgur](https://i.imgur.com/HS7fuXG.png)

### startDate

- Type: `String`
- Default: `new Date() // Today`

The start view date. All the dates before this date will be disabled.

```html
<vue-datepicker :startDate="new Date('2018-07-29')" v-model="date" />
```

![Imgur](https://i.imgur.com/AQ9htF3.png)


### endDate

- Type: `String`
- Default: `Infinity`

The end view date. All the dates after this date will be disabled.

### i18n

- Type: `Object`
- Default:
```javascript
i18n: {
  'day-names': [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  'start-date': 'Start Date',
  'end-date': 'End Date',
  'choose-date': 'Choose Date',
  'month-names': [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
}
```

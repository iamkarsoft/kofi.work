<template>
  <section class="job__content mt-10 p-3 relative ">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-indigo-400 my-4 rounded-full bg-white p-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
        <path
          d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
        />
      </svg>
    </div>
    <section class="lg:flex lg:justify-between relative items-center">
      <div class="ml-0 job__title font-bold text-2xl text-gray-700 my-2">
      <slot name="title" ></slot>
      </div>
      <div class="text-right">
        <slot name="date" class=""></slot>
        <p v-if="duration" class="text-xs text-gray-400 mt-0.5">{{ duration }}</p>
      </div>

    </section>
    <section class="">
      <section class="text-sm  mb-2">
        <slot name="company"></slot>
      </section>
      <section class="mt-4">
        <slot name="duties"></slot>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  name: "BaseJob",

  props: {
    start: {
      type: String,
      default: null,
    },
    end: {
      type: String,
      default: null, // null means "Present"
    },
  },

  computed: {
    duration() {
      if (!this.start) return null;

      const MONTHS = {
        january: 0, february: 1, march: 2, april: 3,
        may: 4, june: 5, july: 6, august: 7,
        september: 8, october: 9, november: 10, december: 11,
      };

      const parseDate = (str) => {
        if (!str || str.toLowerCase() === 'present') return new Date();
        const [monthStr, yearStr] = str.trim().split(' ');
        const month = MONTHS[monthStr.toLowerCase()];
        const year = parseInt(yearStr, 10);
        return new Date(year, month, 1);
      };

      const startDate = parseDate(this.start);
      const endDate = parseDate(this.end);

      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      // For named end dates where the months differ, add 1 to count both
      // the start and end month (Mar→Aug = 6, not 5).
      // Same-month spans are exact anniversaries so no extra month needed
      // (Sep 2021→Sep 2023 = 2 years, not 2 years 1 month).
      if (this.end && startDate.getMonth() !== endDate.getMonth()) {
        months += 1;
        if (months === 12) {
          months = 0;
          years += 1;
        }
      }

      const parts = [];
      if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
      if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);

      return parts.length ? parts.join(', ') : 'Less than a month';
    },
  },
};
</script>
<style lang="css" scoped>
.job__content svg {
  position: absolute;
  top: -2rem;
  left: -1.2rem;
}
</style>

<script lang="ts">
import moment from 'moment'

export default {
  data() {
    return {
      contributions: {
        totalContributions: Number,
        weeks: [] as any[],
      }, // TODO create the type
      loading: true,
      error: null as string | null,
      token: import.meta.env.VITE_GITHUB_TOKEN,
      legendColors: [
        'var(--vt-c-black-mute)',
        'var(--vt-c-royalblue-faded)',
        'var(--vt-c-royalblue-mute)',
        'var(--vt-c-royalblue)',
      ],
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    }
  },
  methods: {
    formatDate(date: string) {
      return moment(date).format('MMMM Do')
    },
    boxColor(contributionCount: number) {
      if (contributionCount === 1) return 'var(--vt-c-royalblue-faded)'
      else if (contributionCount === 2) return 'var(--vt-c-royalblue-mute)'
      else if (contributionCount >= 3) return 'var(--vt-c-royalblue)'
      else return 'var(--vt-c-black-mute)'
    },
    getMonthName(date: string) {
      return new Date(date).toLocaleDateString('en-US', { month: 'short' })
    },
    isNewMonth(date: string, weekIndex: number) {
      if (weekIndex === 0) return true // Always show the first month's label
      const prevWeekDate = this.contributions.weeks[weekIndex - 1].contributionDays[0].date
      return new Date(date).getMonth() !== new Date(prevWeekDate).getMonth()
    },

    async postGitHubContributions() {
      const currentYear = new Date().getFullYear()
      const fromDate = `${currentYear}-01-01T00:00:00Z`
      const toDate = `${currentYear}-12-31T00:00:00Z`

      const query = `{
            user(login: "Kaohiso") {
                contributionsCollection(from: "${fromDate}", to: "${toDate}") {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }
                }
            }
        }`

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })

        const result = await response.json()
        if (result)
          this.contributions = result.data.user.contributionsCollection.contributionCalendar
        else this.error = 'No data found'
      } catch (error) {
        this.error = 'Error fetching contributions'
        console.log('Error fetching contributions:', error)
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.postGitHubContributions()
  },
}
</script>

<template>
  <section>
    <h1 v-if="loading">Laoding...</h1>
    <h1 v-if="error">{{ error }} for</h1>
    <!-- <h3>{{ contributions.totalContributions }} contributions for {{ new Date().getFullYear() }}</h3> -->
    <div class="calendar">
      <div class="week">
        <div class="weekDay" v-for="(day, index) in weekDays">
          <span v-if="index % 2 === 1">{{ weekDays[index] }}</span>
        </div>
      </div>
      <div
        v-if="contributions.weeks.length > 0"
        v-for="(week, weekIndex) in contributions.weeks"
        :key="weekIndex"
        class="week"
      >
        <span
          v-if="isNewMonth(week.contributionDays[0].date, weekIndex)"
          style="position: absolute; top: -27%"
        >
          {{ getMonthName(week.contributionDays[0].date) }}
        </span>
        <div v-for="(day, index) in week.contributionDays" :key="index" class="day">
          <div
            class="box"
            :style="{
              backgroundColor: boxColor(day.contributionCount),
            }"
          >
            <h5 class="day-info">
              {{ day.contributionCount }} contributions on {{ formatDate(day.date) }}.
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="legend">
      <h5>less</h5>
      <div
        v-for="(color, index) in legendColors"
        :key="index"
        class="box"
        :style="{ backgroundColor: color }"
      ></div>
      <h5>more</h5>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(auto, 10px);
  grid-auto-flow: column;
  gap: 3px;
}

.week {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.week:first-child {
  margin-right: 3px;
}

.week:nth-child(2) {
  justify-content: flex-end;
}

.weekDay {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 15%;
  text-align: center;
}

.day-info {
  display: none;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--vt-c-black-dim);
  color: var(--vt-c-white);
  padding: 3px 7px;
  font-size: 12px;
  border-radius: 3px;
  white-space: nowrap;
  z-index: 10;
}

.box:hover .day-info {
  display: block;
}

.box {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 15%;
}

.legend {
  display: flex;
  flex-direction: row;
  gap: 3px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>

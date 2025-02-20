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
    }
  },
  methods: {
    formatDate(date: string) {
      return moment(date).format('MMMM Do')
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
    <h3>{{ contributions.totalContributions }} contributions for {{ new Date().getFullYear() }}</h3>
    <div class="week">
      <div
        v-if="contributions.weeks.length > 0"
        v-for="(week, index) in contributions.weeks"
        :key="index"
      >
        <div v-for="(day, index) in week.contributionDays" :key="index" class="days">
          <div
            class="box"
            :style="{
              backgroundColor:
                day.contributionCount > 0 ? 'var(--vt-c-royalblue)' : 'var(--vt-c-black-mute)',
            }"
          >
            <h5 class="day-info">
              {{ day.contributionCount }} contributions on {{ formatDate(day.date) }}.
            </h5>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.week {
  display: grid;
  grid-template-columns: repeat(auto, 10px);
  grid-auto-flow: column;
  width: 20%;
  margin: auto;
}

.days {
  margin: 3px;
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
</style>

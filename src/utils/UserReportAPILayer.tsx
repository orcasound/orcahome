import { gql, request } from 'graphql-request'
import { useEffect, useState } from 'react'

import { LastDetection } from '../components/LastDetection'
//Feel free to add additional GraphQL queries as needed

export const UserReportAPILayer = (): JSX.Element => {
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const detectionQuery: string = gql`
      query getDetections($pagination: Pagination!) {
        detections(pagination: $pagination) {
          meta {
            currentPage
            previousPage
            nextPage
            totalEntries
            totalPages
          }
          entries {
            timestamp
          }
        }
      }
    `
    const variables: { pagination: { page: number; pageSize: number } } = {
      pagination: {
        page: 1,
        pageSize: 10,
      },
    }
    request('https://live.orcasound.net/graphql', detectionQuery, variables)
      .then((data: any): any => {
        //Reformatting of time data for LastDetection component
        //Array time data
        if (
          data &&
          data.detections &&
          Array.isArray(data.detections.entries) &&
          data.detections.entries.length > 0 &&
          data.detections.entries[0].timestamp
        ) {
          const dateIsolate = data.detections.entries[0].timestamp
          const replaceChars: string = dateIsolate
            .replace('Z', '')
            .replace('T', '-')
            .replace('/-/g', '/')
          const splitChars: any = replaceChars.split('-')
          setDate(splitChars[1] + '-' + splitChars[2] + '-' + splitChars[0])
        } else {
          // Handle case where no detection entries are available
          setDate('No detection data')
        }
      })
      .catch((error: any) => {
        console.error('Error fetching detections:', error)
        setDate('Error fetching data')
      })
  }, [])
  return (
    <>
      <div>{date && <LastDetection date={date} />}</div>
    </>
  )
}

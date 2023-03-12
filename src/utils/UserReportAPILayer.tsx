import { gql, request } from 'graphql-request'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { LastDetection } from '../components/LastDetection'
//Feel free to add additional GraphQL queries as needed

interface UserReport {
  date: number | string
  setDate: Dispatch<SetStateAction<number | string>>
}

export const UserReportAPILayer = (props: UserReport): JSX.Element => {
  const [date, setDate]: any = useState('')

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
    request(
      'https://live.orcasound.net/graphql',
      detectionQuery,
      variables
    ).then((data: any): any => {
      //Reformatting of time data for LastDetection component
      //Array time data
      const dateIsolate = data.detections.entries[0].timestamp
      const replaceChars: string = dateIsolate
        .replace('Z', '')
        .replace('T', '-')
        .replace('/-/g', '/')
      const splitChars: any = replaceChars.split('-')
      const splitHrMinSec: any = String(splitChars[3]).split(':')

      setDate(splitChars[1] + '-' + splitChars[2] + '-' + splitChars[0])
    })
  }, [])
  return (
    <>
      <div>{date && <LastDetection date={date} />}</div>
    </>
  )
}

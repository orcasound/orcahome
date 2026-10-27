import {
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

// A cell that is only a web address becomes a link (the migrated WordPress
// tables use bare URLs as link text).
const isUrl = (text) => /^https?:\/\/\S+$/.test(text)

const Cell = ({ text, header }) => (
  <TableCell
    component={header ? 'th' : 'td'}
    scope={header ? 'col' : undefined}
    sx={{
      fontWeight: header ? 600 : undefined,
      verticalAlign: 'top',
      minWidth: 80,
      // Long URLs may break anywhere; normal text only breaks between words.
      ...(isUrl(text) && { overflowWrap: 'anywhere', minWidth: 160 }),
    }}
  >
    {isUrl(text) ? (
      <MuiLink href={text} target="_blank" rel="noopener noreferrer">
        {text}
      </MuiLink>
    ) : (
      text
    )}
  </TableCell>
)

// `dataTable` block in a Portable Text body (#467): rows of plain-text cells,
// optional header row. Scrolls sideways on narrow screens instead of
// overflowing the page.
const DataTable = ({ value }) => {
  const rows = (value?.rows || []).map((row) => row?.cells || [])
  if (!rows.length) return null
  const columns = Math.max(...rows.map((cells) => cells.length))
  // Pad short rows so every row has the same number of cells.
  const pad = (cells) => [...cells, ...Array(columns - cells.length).fill('')]
  const [head, body] = value.headerRow ? [rows[0], rows.slice(1)] : [null, rows]

  return (
    <TableContainer sx={{ my: 4, overflowX: 'auto', clear: 'both' }}>
      <Table size="small">
        {head && (
          <TableHead>
            <TableRow>
              {pad(head).map((text, i) => (
                <Cell key={i} text={text} header />
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {body.map((cells, r) => (
            <TableRow key={r}>
              {pad(cells).map((text, i) => (
                <Cell key={i} text={text} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable

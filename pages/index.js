import {
  Heading,
  Container,
  Box,
  Grid,
  Text,
  Card,
  Input,
  Flex,
} from 'theme-ui'
import data from '../lib/data'
import theme from '../lib/theme'
import colours from '../lib/colours'
import { Avatar } from '@geist-ui/react'
import names from '../lib/names.json'
const { orderBy, filter } = require('lodash')
const title = require('title')
const { flag, code, name, countries } = require('country-emoji')
import { useState } from 'react'
function isOdd(num) {
  return num % 2
}

const images = {
  python:
    'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/267_Python_logo-512.png',
  js:
    'https://cloud-dfja2si6p-hack-club-bot.vercel.app/0javascript_icon_130900.png',
  php:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Webysther_20160423_-_Elephpant.svg/1280px-Webysther_20160423_-_Elephpant.svg.png',
  sql:
    'https://www.sqlserverlogexplorer.com/wp-content/uploads/2019/11/sql-database.png',
  bash:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/1200px-Bash_Logo_Colored.svg.png',
  java:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-BAHXD0dwrCvkGkN9BgB6kmRQN-PvKATXkg&usqp=CAU',
  c_sharp:
    'https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png',
  c_plus_plus:
    'https://www.primafelicitas.com/wp-content/uploads/2018/07/c-plus-plus-logo.png',
  ruby:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1024px-Ruby_logo.svg.png',
  r: 'https://www.r-project.org/logo/Rlogo.svg',
  c: 'https://cdn.iconscout.com/icon/free/png-512/c-programming-569564.png',
  actionscript:
    'https://lh3.googleusercontent.com/proxy/https://img.stackshare.io/service/2329/thumb_retina_8ei_UuLc_400x400.png',
  go:
    'https://www.pngkit.com/png/detail/380-3801403_go-programming-language-logo-golang-logo-png.png',
}

const Named = props => {
  const [search, setSearch] = useState('')
  console.log(data[props.additionalData].first)
  return (
    <Box {...props}>
      <Box
        className="top-box"
        sx={{
          background: theme =>
            theme.util.gx(
              props.country.colours[0],
              props.country.colours[1]
                ? props.country.colours[1]
                : `dark${props.country.colours[0]}`,
            ),
          minHeight: '30vh',
        }}
      >
        <Flex
          py={[4, 4, 4]}
          sx={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '30vh',
          }}
        >
          <Box>
            <Heading
              sx={{
                marginLeft: '0px',
                fontWeight: [500, 800, 800],
                mb: [1, 0, 0],
              }}
            >
              {props.country.full.includes('United') ? 'The ' : ''}
              {title(props.additionalData, {
                special: ['USA', 'UAE'],
              })}{' '}
              is in love with
            </Heading>
            <Heading sx={{ fontSize: ['3em', '7em', '9em'] }}>
              {props.country.full == 'The World'
                ? 'Python'
                : title(data[props.additionalData].first, {
                    special: ['SQL', 'PHP'],
                  })
                    .replace('JS', 'JavaScript')
                    .replace('C_sharp', 'C#')
                    .replace('C_plus_plus', 'C++')}
            </Heading>
            <Heading
              sx={{
                marginLeft: '0px',
                fontWeight: [500, 800, 800],
                mt: [data[props.additionalData].first === "python" ? 3 : 1],
              }}
            >
              How about other countries?
            </Heading>
          </Box>
        </Flex>
      </Box>
      <Container py={4} pt={3}>
        <Card
          mb={3}
          p={1}
          sx={{ p: ['8px!important', '8px!important', '8px!important'] }}
        >
          <Input
            value={search}
            onInput={e => setSearch(e.target.value)}
            sx={{
              bg: 'sunken',
              textAlign: 'center',
            }}
            placeholder={`Search the ${Object.keys(data).length} nations`}
          ></Input>
        </Card>
        <Grid
          columns={[1, 1, 1, 2]}
          gap={0}
          sx={{ borderRadius: 'extra', bg: 'elevated' }}
        >
          {orderBy(
            Object.entries(data).map(x => ({ key: x[0], value: x[1] })),
            'key',
            'asc',
          ).map((x, index) => {
            x = x['key']
            return (
              <Box
                p={3}
                sx={{
                  borderRight: isOdd(index + 1) ? '1px solid black' : 'none',
                  borderBottom: '1px solid black',
                  display:
                    x.toLowerCase().includes(search.toLowerCase()) ||
                    search == ''
                      ? 'default'
                      : 'none',
                }}
              >
                <Grid columns={['3fr', '3fr 3fr', '2.8fr 3.2fr']}>
                  <Box
                    sx={{
                      fontWeight: '800',
                      fontSize:
                        x == 'bosnia & herzegovina'
                          ? '1.2em'
                          : 'calc(1.2em + 0.15vw)',
                    }}
                  >
                    <Text
                      sx={{
                        marginRight: '3px',
                        fontSize:
                          x == 'bosnia & herzegovina' ? '1.05em' : '1em',
                      }}
                    >
                      {x != 'bosnia & herzegovina' ? flag(x) : '🇧🇦'}
                    </Text>{' '}
                    {title(x, {
                      special: ['USA', 'UAE'],
                    })}
                  </Box>
                  <Box sx={{ textAlign: ['left', 'right'] }}>
                    <Text
                      sx={{
                        bg: '#17171d',
                        verticalAlign: 'super',
                        display: 'inline-block',
                        height: '1.875rem',
                        borderRadius: '999px',
                      }}
                    >
                      <Avatar
                        src={images[data[x]['first']]}
                        style={{ background: '#17171d', border: 'none' }}
                      ></Avatar>{' '}
                      <Text
                        sx={{
                          display: 'inline-block',
                          pt: '2.2px',
                          pl: '4px',
                          pr: '8px',
                          height: '1.875rem',
                          verticalAlign: 'middle',
                        }}
                      >
                        {title(data[x]['first'], {
                          special: ['SQL', 'PHP'],
                        })
                          .replace('JS', 'JS')
                          .replace('C_sharp', 'C#')
                          .replace('C_plus_plus', 'C++')}{' '}
                        (
                        {Math.round(
                          (data[x]['winner_amount'] / data[x]['total_people']) *
                            100,
                        )}
                        %)
                      </Text>
                    </Text>
                    <Box
                      className="runnersup"
                      sx={{ display: 'inline', ml: '4px' }}
                    >
                      <Avatar src={images[data[x]['second']]} />
                      <Avatar src={images[data[x]['third']]} />
                      <Avatar src={images[data[x]['fourth']]} />
                    </Box>
                  </Box>
                </Grid>
              </Box>
            )
          })}
        </Grid>
        <Card p={[3, 3, 3]} sx={{ mt: 3, textAlign: 'center' }}>
          By <b>@sampoder</b>, open sourced <b>here</b>. Data from{' '}
          <b>GitHub Education's Annual Report</b>.
        </Card>
      </Container>
      <style>
        {`
        .avatar-group{
          display: inline-flex!important
        }

        .avatar{
          border: 1px solid #17171d!important;
          background: #17171d!important;
          padding: 4px;
          object-fit: cover;
        }
        .avatar-img{
          object-fit: cover;
        }
        .runnersup .avatar{
          margin-left: 4px
        }
        `}
      </style>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const geoip = require('geoip-country')
  const { filter } = require('lodash')
  const sortedColours = colours.map(colour => ({
    country:
      names[
        colour['Country']
          .replace(' ', '')
          .normalize('NFD')
          .replace('the', '')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\W/g, '')
          .toLocaleUpperCase()
      ],
    full: colour['Country'],
    colours: colour['Primary colours']
      .replace('and', ',')
      .replace(' ', '')
      .split(','),
  }))
  const ip = context.req.headers['x-forwarded-for']
    ? context.req.headers['x-forwarded-for']
    : '118.200.236.168'
  console.log(geoip.lookup(ip))
  const country = filter(
    sortedColours,
    colour => colour.country === geoip.lookup(ip).country,
  )
  let data2
  try {
    data2 = filter(Object.keys(data), x => code(x) === code(country[0].full))
  } catch {
    country[0] = { full: 'The World', colours: ['green', 'blue'] }
    data2 = filter(Object.keys(data), x => code(x) === 'XXXX')
  }

  if (!data2[0]) {
    data2[0] = 'the world'
  }
  console.log(data2)
  return {
    props: { country: country[0], additionalData: data2[0] },
  }
}

export default Named

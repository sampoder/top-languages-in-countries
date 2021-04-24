const csvFilePath = 'data.csv'
const csv = require('csvtojson')
const orderBy = require('lodash').orderBy
const filter = require('lodash').filter
const fs = require('fs')
csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    jsonObj = jsonObj.map(x => ({
      country: x['In what country do you live?'].toLowerCase(),
      js_know: x['Do you know JavaScript?'] != '' ? true : false,
      js_score:
        x['Do you know JavaScript?'] != ''
          ? 1 +
            (x['How good are you at JavaScript?'] == 'Expert'
              ? 4
              : x['How good are you at JavaScript?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      sql_know: x['Do you know SQL?'] != '' ? true : false,
      sql_score:
        x['Do you know SQL?'] != ''
          ? 1 +
            (x['How good are you at SQL?'] == 'Expert'
              ? 4
              : x['How good are you at SQL?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      java_know: x['Do you know Java?'] != '' ? true : false,
      java_score:
        x['Do you know Java?'] != ''
          ? 1 +
            (x['How good are you at Java?'] == 'Expert'
              ? 4
              : x['How good are you at Java?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      bash_know: x['Do you know Bash/Shell?'] != '' ? true : false,
      bash_score:
        x['Do you know Bash/Shell?'] != ''
          ? 1 +
            (x['How good are you at Bash/Shell?'] == 'Expert'
              ? 4
              : x['How good are you at Bash/Shell?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      python_know: x['Do you know Python?'] != '' ? true : false,
      python_score:
        x['Do you know Python?'] != ''
          ? 1 +
            (x['How good are you at Python?'] == 'Expert'
              ? 4
              : x['How good are you at Python?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      r_know: x['Do you know R?'] != '' ? true : false,
      r_score:
        x['Do you know R?'] != ''
          ? 1 +
            (x['How good are you at R?'] == 'Expert'
              ? 4
              : x['How good are you at R?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      c_sharp_know: x['Do you know C#?'] != '' ? true : false,
      c_sharp_score:
        x['Do you know C#?'] != ''
          ? 1 +
            (x['How good are you at C#?'] == 'Expert'
              ? 4
              : x['How good are you at C#?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      php_know: x['Do you know PHP?'] != '' ? true : false,
      php_score:
        x['Do you know PHP?'] != ''
          ? 1 +
            (x['How good are you at PHP?'] == 'Expert'
              ? 4
              : x['How good are you at PHP?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      c_plus_plus_know: x['Do you know C++?'] != '' ? true : false,
      c_plus_plus_score:
        x['Do you know C++?'] != ''
          ? 1 +
            (x['How good are you at C++?'] == 'Expert'
              ? 4
              : x['How good are you at C++?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      c_know: x['Do you know C?'] != '' ? true : false,
      c_score:
        x['Do you know C?'] != ''
          ? 1 +
            (x['How good are you at C?'] == 'Expert'
              ? 4
              : x['How good are you at C?'] == 'Intermediate'
              ? 2
              : 1)
          : 0,
      ...x,
    }))
    jsonObj.map((x, index) => {
      if (x['Do you know anything else?'] != '') {
        jsonObj[index][
          `${x['Do you know anything else?']
            .split(',')[0]
            .toLowerCase()
            .replace('golang', 'go')}_score`
        ] =
          1 +
          (x['How good are you at [OTHER]?'] == 'Expert'
            ? 4
            : x['How good are you at [OTHER]?'] == 'Intermediate'
            ? 2
            : 1)
        jsonObj[index]['custom_key'] = `${x['Do you know anything else?']
          .split(',')[0]
          .toLowerCase()
          .replace('golang', 'go')}_score`
      }
    })

    countries = {}
    jsonObj.map((x, index) => {
      if (
        typeof countries[x['In what country do you live?'].toLowerCase()] ==
        'undefined'
      ) {
        countries[x['In what country do you live?'].toLowerCase()] = {
          ...countries[x['In what country do you live?'].toLowerCase()],
          js_score: x.js_score,
          sql_score: x.sql_score,
          java_score: x.java_score,
          bash_score: x.bash_score,
          python_score: x.python_score,
          r_score: x.r_score,
          c_sharp_score: x.c_sharp_score,
          php_score: x.php_score,
          c_plus_plus_score: x.c_plus_plus_score,
          c_score: x.c_score,
        }
      } else {
        countries[x['In what country do you live?'].toLowerCase()] = {
          ...countries[x['In what country do you live?'].toLowerCase()],
          js_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .js_score + x.js_score,
          sql_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .sql_score + x.sql_score,
          java_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .java_score + x.java_score,
          bash_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .bash_score + x.bash_score,
          python_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .python_score + x.python_score,
          r_score:
            countries[x['In what country do you live?'].toLowerCase()].r_score +
            x.r_score,
          c_sharp_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .c_sharp_score + x.c_sharp_score,
          php_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .php_score + x.php_score,
          c_plus_plus_score:
            countries[x['In what country do you live?'].toLowerCase()]
              .c_plus_plus_score + x.c_plus_plus_score,
          c_score:
            countries[x['In what country do you live?'].toLowerCase()].c_score +
            x.c_score,
        }
      }
      if (typeof x['custom_key'] != 'undefined') {
        if (
          typeof countries[x['In what country do you live?'].toLowerCase()][
            x['custom_key']
          ] != 'undefined'
        ) {
          countries[x['In what country do you live?'].toLowerCase()][
            x['custom_key']
          ] =
            countries[x['In what country do you live?'].toLowerCase()][
              x['custom_key']
            ] + x[x['custom_key']]
        } else {
          countries[x['In what country do you live?'].toLowerCase()][
            x['custom_key']
          ] = x[x['custom_key']]
        }
      }
    })
    Object.keys(countries).map(x => {
      let first = orderBy(
        Object.entries(countries[x]).map(x => ({
          key: x[0],
          value: x[1],
        })),
        'value',
        'desc',
      )[0].key.replace('_score', '')
      let practiseObj = { country: x }
      practiseObj[`${first}_know`] = true
      countries[x] = {
        ...countries[x],
        first: orderBy(
          Object.entries(countries[x]).map(x => ({
            key: x[0],
            value: x[1],
          })),
          'value',
          'desc',
        )[0].key.replace('_score', ''),
        second: orderBy(
          Object.entries(countries[x]).map(x => ({
            key: x[0],
            value: x[1],
          })),
          'value',
          'desc',
        )[1].key.replace('_score', ''),
        third: orderBy(
          Object.entries(countries[x]).map(x => ({
            key: x[0],
            value: x[1],
          })),
          'value',
          'desc',
        )[2].key.replace('_score', ''),
        fourth: orderBy(
          Object.entries(countries[x]).map(x => ({
            key: x[0],
            value: x[1],
          })),
          'value',
          'desc',
        )[3].key.replace('_score', ''),
        winner_amount: filter(jsonObj, practiseObj).length,
        total_people: filter(jsonObj, { country: x }).length,
      }
    })
    console.log(Object.keys(countries).length)
    fs.writeFile('finals.json', JSON.stringify(countries), function (err) {
      if (err) throw err
      console.log('Replaced!')
    })
  })

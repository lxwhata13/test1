node {
  checkout([
    $class: 'GitSCM',
    branches: [[name: 'refs/heads/' + env.BRANCH_NAME]],
    extensions: [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
    userRemoteConfigs: scm.userRemoteConfigs,
  ])

  sh "git checkout ${env.BRANCH_NAME}"
  sh "git reset --hard origin/${env.BRANCH_NAME}"

  sh 'docker pull node:16-alpine'
  sh 'rm -rf dist'

  USER_GROUP = '1000:1000'

  try {
    stage('Pre-Build') {
      sh "sed -i 's/Winzada/Heyler777/g' package.json"
    }

    stage('Build') {
      lock('build_process') {
        script = """
          docker run --rm \\
            --workdir "/code" \\
            --user "$USER_GROUP" \\
            -v $WORKSPACE:/code:rw \\
            -v /data/pm/yarn:/.yarn:rw \\
            node:16-alpine /bin/sh -c 'yarn install; yarn build'
        """

        sh(script)
      }
    }

    stage('Deploy') {
      script {
        switch (env.BRANCH_NAME) {
          case 'main':
            sh 'rsync -avzc dist/spa/* opm:/data/share/app/static/'
            notify('-1001445946390', 'App客户端页面(测试环境)已成功发布')
            break

          case 'heyler777':
            sh 'rsync -avzc dist/spa/* heyler777-jenkins:/share/app/static/'
            notify('-1001445946390', 'App客户端页面(Heyler777)已成功发布')
            break

          default:
            notify('1299910346', 'App客户端页面自动构建完成')
            break
        }
      }
    }
  }
  catch (e) {
    notify('1299910346', '自动构建失败')
    throw(e)
  }
}

void notify(String chatId, String message) {
  try {
    changes = makeChangeList()
    composedMessage = """
[$currentBuild.fullDisplayName]($currentBuild.absoluteUrl)
更新内容:
${changes}
**${message}**
"""
    echo "composedMessage: $composedMessage"

    requestBody = [
      "text": composedMessage,
      "chat_id": chatId,
      "parse_mode": "markdown",
      "disable_web_page_preview": true
    ]

    baseUrl = 'https://api.telegram.org/bot1664207868:AAFrOW8Oyk1MeF-ET8hYjpVEZlwSHpi0Di8/sendMessage'

    httpRequest(consoleLogResponseBody: true,
                contentType: 'APPLICATION_JSON',
                httpMode: 'POST',
                requestBody: groovy.json.JsonOutput.toJson(requestBody),
                url: baseUrl,
                validResponseCodes: '200')
  }
  catch (e) {
    echo "exception: $e"
  }
}

@NonCPS
String makeChangeList() {
  changeLogSets = currentBuild.changeSets
  listHtml = ''

  for (int i = 0; i < changeLogSets.size(); i++) {
    entries = changeLogSets[i].items
    for (int j = 0; j < entries.length; j++) {
      entry = entries[j]
      index = j+1
      listHtml += "    ${index}. *${entry.author}*: **${escapeString(entry.msg)}**\n"
      entry = null
    }
    entries = null
  }
  changeLogSets = null

  return listHtml == '' ? '没有更新记录' : listHtml
}

@NonCPS
String escapeString(String str) {
  return str.replace("_", "\\_")
    .replace("*", "\\*")
    .replace("[", "\\[")
    .replace("`", "\\`");
}


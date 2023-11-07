const fs = require('fs'); // 파일 시스템 모듈 사용
const path = require('path'); // 경로 관련 모듈 사용

// 소스 코드 디렉토리 경로 설정
const srcFolderPath = path.join(__dirname, 'src');

// (직접 수정) index.js = true, index.ts = false
const isJavaScript = false;
const extension = isJavaScript ? 'js' : 'ts';

// (직접 수정) 처리 대상 디렉토리 목록
const targetFolderList = ['apis', 'components', 'constants', 'hooks', 'pages', 'states'];

// (직접 수정) 예외 파일 목록
const exceptionFileList = ['exception'];

targetFolderList.forEach((folder) => {
  const folderPath = path.join(srcFolderPath, folder); // 대상 폴더의 전체 경로 생성
  if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
    generateIndexFile(folderPath); // 대상 폴더에서 index.js(ts) 파일 생성 함수 호출
  }
});

let count = 0;

// 지정된 디렉토리 내의 파일들을 기반으로 index.js(ts) 파일을 생성하는 함수
function generateIndexFile(directoryPath) {
  // 현재 디렉토리 내의 index.js(ts) 파일 경로 생성
  const indexFilePath = path.join(directoryPath, `index.${extension}`);

  // 현재 스크립트 파일과의 상대 경로 계산
  const relativePath = path.relative(__dirname, indexFilePath);

  const files = fs.readdirSync(directoryPath); // 디렉토리 내의 파일 목록을 읽어옴

  const exportStatementList = []; // export 구문을 담을 배열

  files.forEach((file) => {
    // 파일의 전체 경로 생성
    const filePath = path.join(directoryPath, file);

    // 확장자를 제외한 파일 이름 추출
    const fileNameWithoutExtension = path.basename(file, path.extname(file));

    // 예외 파일 목록에 포함되는지 확인
    const isException = exceptionFileList.some((exceptionFileName) =>
      exceptionFileName.toLowerCase().includes(fileNameWithoutExtension.toLowerCase()),
    );

    if (isException) return; // 예외 파일인 경우, 다음 파일로 넘어감

    if (
      fs.statSync(filePath).isFile() &&
      (file.endsWith(`.${extension}`) || file.endsWith(`.${extension}x`)) &&
      file !== `index.${extension}`
    ) {
      // 파일이 존재하고 확장자가 .js(ts) 또는 .jsx(tsx)이며, 파일 이름이 index.js(ts)가 아닌 경우
      exportStatementList.push(`export * from './${fileNameWithoutExtension}';`);
    } else if (fs.statSync(filePath).isDirectory() && file !== `index.${extension}`) {
      // 디렉토리인 경우, 파일 이름이 index.js(ts)가 아닌 경우
      exportStatementList.push(`export * from './${fileNameWithoutExtension}';`);
      generateIndexFile(filePath); // 재귀적으로 하위 디렉토리 처리
    }
  });

  const content = exportStatementList.join('\n'); // export 구문을 줄 바꿈으로 연결하여 내용 생성
  fs.writeFileSync(indexFilePath, content); // 생성된 내용을 index.js(ts) 파일에 쓰기

  console.log(`${++count} ${`\t`} ${relativePath}`);
}

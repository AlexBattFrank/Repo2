import styles from './ResultPage.module.css'
import { ResultItem } from '../../components/ResultItem'
import { ResultSlider } from '../../components/ResultSlider'
import ResultPageImg from '../../assets/images/ResultPageImg.svg'
import { mapArrFunc } from '../../utils/mapArrFunc'
import { useContext, useEffect, useState } from 'react'
import ResultContext from '../../context/createContext'
import { getDetailData } from '../../api/dataService'
import { GeneralResultLoader } from '../../components/GeneralResultLoader'

// Эта функция принимает набор id документов и получает детализированные данные для каждого из них
async function fetchDetailData(documentIds) {
  try {
    const response = await getDetailData(documentIds);
    return response;
  } catch (error) {
    console.error("Failed to fetch detail data", error);
    return null;
  }
}

// Эта функция принимает список документов и возвращает первые n из них
function getFirstN(documentList, n) {
  return documentList.slice(0, n);
}

function ResultPage() {
  const context = useContext(ResultContext)
  const [countDocs, setCountDocs] = useState(4)

  const resultGeneralData = context.generalData
  const resultData = context.data

  const detailsData = context.detailsData
  const setDetailsData = context.setDetailsData

  useEffect(() => {
    if (resultData && resultData.data.items.length > 0) {
      const documentIds = getFirstN(resultData.data.items, countDocs).map(item => item.encodedId);
      fetchDetailData(documentIds).then(setDetailsData);
    }
  }, [resultData, countDocs])

  const moreBtnHandler = () => {
    const countDocsIterator = 4; // число на которое увеличивается количество записей
    const remainingDocs = resultData.data.items.length - countDocs;
    const additionalDocs = Math.min(remainingDocs, countDocsIterator);
    setCountDocs(countDocs + additionalDocs);
  }

  return (
    <main className={styles.resultPage}>
      <div className={styles.soonResult}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Ищем. Скоро будут результаты</h1>
          <p className={styles.text}>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>
        <img className={styles.resultImg} src={ResultPageImg} alt="soon result" />
      </div>
      <div className={styles.summaryBlock}>
        <h2 className={styles.subtitle}>Общая сводка</h2>
        <p className={styles.dataSum}>Найдено
          {!resultGeneralData
            ? ` 0`
            : ` ${mapArrFunc(resultGeneralData.data.data).length}`} вариантов
        </p>
        {<ResultSlider isLoading={!resultGeneralData} data={!resultGeneralData
          ? []
          : resultGeneralData.data.data} />}
      </div>
      <div className={styles.resultBlock}>
        <h2 className={styles.subtitle}>Список документов</h2>
        <ul className={styles.resultList}>
          {!resultData || +resultData.data.items.length === 0
            ? <p></p>
            : !detailsData
              ? <GeneralResultLoader />
              : detailsData.data.map(item => <ResultItem key={item.ok.id} data={item.ok} />)}
        </ul>
        <button onClick={moreBtnHandler} className={resultData && ((countDocs) >= +resultData.data.items.length) ? styles.seeMoreBtnHidden : styles.seeMoreBtn}>Показать больше</button>
      </div>
    </main>
  )
}

export { ResultPage }
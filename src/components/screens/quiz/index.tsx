import React, { useEffect, useRef } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useQuizContext } from "../../../providers/Quiz";
import RNCta, { RNPrimaryCTA, RNSecondaryCTA } from "../../common/RNCta";
import { styles } from "./styles";
import QuestionCard from "../../common/QuestionCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import questions from "../../../data/questions";
import RNCard from "../../common/RNCard";
import instructions from "../../../data/instructions";
import CountDown from "../../common/Countdown";
import { AntDesign } from "@expo/vector-icons";
import { hpx } from "../../../libraries/responsive-pixels";

const QuizScreen = () => {
  const {
    isStarted,
    isFinished,
    score,
    bestScore,
    totalScore,
    endTime,
    questionIndex,
    totalQuestions,
    onPrevQuestion,
    onNextQuestion,
    hasNextQuestion,
    hasPreviousQuestion,
    onStartQuiz,
    onSubmitQuiz,
    onResetQuiz,
    onTimesUp,
  } = useQuizContext();
  const questionsListRef = useRef();

  const scrollToQuestion = () => {
    if (questionsListRef.current) {
      questionsListRef.current?.scrollToIndex({
        index: questionIndex,
        animated: true,
        viewOffset: hpx(25),
      });
    }
  };

  useEffect(() => {
    scrollToQuestion();
  }, [questionIndex]);

  // Quiz Questionnaire
  const renderQuizQuestionnaireHeader = () => (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.headerTitle}>
        Question {questionIndex + 1} / {totalQuestions}
      </Text>
      <RNCta
        onPress={onResetQuiz}
        style={{
          backgroundColor: "#fecaca",
          borderRadius: 1000,
          padding: 10,
        }}
      >
        <AntDesign name="close" size={24} color="black" />
      </RNCta>
    </View>
  );

  const renderQuizQuestionnaireBody = () => (
    <View>
      <FlatList
        ref={questionsListRef}
        data={questions}
        horizontal
        renderItem={({ item }) => (
          <RNCard
            title={item?.title}
            containerStyles={styles.questionsContainer}
          >
            <QuestionCard question={item} />
          </RNCard>
        )}
        contentContainerStyle={styles.questionCardsContainer}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        pagingEnabled
        scrollEnabled={false}
      />
      <CountDown
        enabled={isStarted && !isFinished}
        endTime={endTime}
        onEnd={onTimesUp}
      />
    </View>
  );

  const renderQuizQuestionnaireFooter = () => (
    <View>
      {hasNextQuestion ? (
        <RNPrimaryCTA
          onPress={onNextQuestion}
          title={"Next"}
          rightIcon={
            <FontAwesome6 name="arrow-right-long" size={16} color="white" />
          }
          containerStyles={styles.ctaContainer}
        />
      ) : (
        <RNPrimaryCTA
          onPress={onSubmitQuiz}
          title={"Submit"}
          containerStyles={styles.ctaContainer}
        />
      )}
      {hasPreviousQuestion && (
        <RNSecondaryCTA
          onPress={onPrevQuestion}
          title={"Previous"}
          containerStyles={styles.ctaContainer}
        />
      )}
    </View>
  );

  // Quiz Instructions
  const renderQuizInstructionsHeader = () => {
    return <Text style={styles.instructionHeaderTitle}>Quiz</Text>;
  };

  const renderQuizInstructionsBody = () => {
    return (
      <RNCard
        title="Instructions!"
        containerStyles={styles.instructionsCardContainer}
      >
        {instructions.map((instruction, idx) => (
          <View key={instruction}>
            <Text style={styles.resultLabel}>
              {idx + 1}. {instruction}
            </Text>
          </View>
        ))}
      </RNCard>
    );
  };

  const renderQuizInstructionsFooter = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <RNPrimaryCTA
          title="Start"
          containerStyles={styles.ctaContainer}
          onPress={onStartQuiz}
        />
      </View>
    );
  };

  // Quiz Result
  const renderResultValueField = (label: string, value: string | number) => (
    <View style={styles.resultContainer}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );

  const renderQuizResultHeader = () => {
    return <Text style={styles.resultHeaderTitle}>Result</Text>;
  };

  const renderQuizResultBody = () => {
    return (
      <RNCard title="Well done!" containerStyles={styles.resultCardContainer}>
        {renderResultValueField("Total Questions", totalQuestions)}
        {renderResultValueField("Score", score)}
        {renderResultValueField("Best Score", bestScore)}
        <View style={styles.resultBodyDivider} />
        {renderResultValueField("Total Score", totalScore)}
      </RNCard>
    );
  };

  const renderQuizResultFooter = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <RNPrimaryCTA
          title="Done"
          containerStyles={styles.ctaContainer}
          onPress={onResetQuiz}
        />
      </View>
    );
  };

  const renderQuizInstructions = () => {
    if (isStarted) {
      // Quiz Started
      return <></>;
    }
    return (
      <View style={{ flex: 1 }}>
        {renderQuizInstructionsHeader()}
        {renderQuizInstructionsBody()}
        {renderQuizInstructionsFooter()}
      </View>
    );
  };

  const renderQuizQuestionnaire = () => {
    if (!isStarted || isFinished) {
      // Quiz Not Started nor Finished
      return <></>;
    }
    return (
      <>
        {renderQuizQuestionnaireHeader()}
        {renderQuizQuestionnaireBody()}
        {renderQuizQuestionnaireFooter()}
      </>
    );
  };

  const renderQuizResult = () => {
    if (!isFinished) {
      // Quiz Not Finished
      return <></>;
    }
    return (
      <View style={{ flex: 1 }}>
        {renderQuizResultHeader()}
        {renderQuizResultBody()}
        {renderQuizResultFooter()}
      </View>
    );
  };

  // render
  return (
    <SafeAreaView style={styles.container}>
      {renderQuizInstructions()}
      {renderQuizQuestionnaire()}
      {renderQuizResult()}
    </SafeAreaView>
  );
};

const ListEmptyComponent = () => <RNCard title="No Data Available" />;

export default QuizScreen;

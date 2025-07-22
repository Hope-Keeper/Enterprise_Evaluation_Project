import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "answers")
public class Answer {
    @Id
    private String id;

    private String evaluatorId;
    private String evaluateeId;
    private String questionId;
    private String answerValue;

}
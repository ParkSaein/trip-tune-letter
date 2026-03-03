@Entity
@Getter
@Setter
public class Newsletter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String link;

    private String musicTitle;
    private String musicArtist;
    private String musicYoutube;

    private boolean isDraft;
}